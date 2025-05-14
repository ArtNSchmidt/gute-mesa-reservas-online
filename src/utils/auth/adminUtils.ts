
import { supabase } from '@/integrations/supabase/client';
import { Admin } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { User } from '@supabase/supabase-js';

/**
 * Verifica se um ID de usuário pertence a um administrador e retorna os dados do admin
 */
export const verifyAdminAndGetData = async (userId: string): Promise<Admin | null> => {
  try {
    // Verificar se o usuário é admin
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (profileError) {
      console.error('Erro ao verificar perfil:', profileError);
      throw profileError;
    }
    
    // Se não encontrou perfil, tenta criar um perfil admin
    if (!profileData) {
      const { data: userData, error: userError } = await supabase.auth.admin.getUserById(userId);
      
      if (userError || !userData.user) {
        console.error('Usuário não encontrado:', userError);
        return null;
      }
      
      // Criar perfil para o usuário
      const { error: insertError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: userData.user.email,
          name: 'Administrador',
          role: 'admin'
        });
        
      if (insertError) {
        console.error('Erro ao criar perfil:', insertError);
        return null;
      }
      
      return {
        email: userData.user.email || '',
        name: 'Administrador'
      };
    }
    
    if (profileData.role === 'admin') {
      return {
        email: profileData.email || '',
        name: profileData.name || 'Administrador'
      };
    }
    
    return null;
  } catch (error) {
    console.error('Erro ao verificar perfil:', error);
    return null;
  }
};

/**
 * Cria um novo usuário administrador diretamente, sem confirmação de email
 */
export const createAdminUser = async (email: string, password?: string): Promise<string | null> => {
  try {
    // Se não tiver uma senha, gera uma aleatória
    const adminPassword = password || Math.random().toString(36).slice(-10);
    
    console.log("Iniciando criação de administrador com email:", email);
    
    // Criar o usuário diretamente sem enviar email de confirmação
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password: adminPassword,
      options: {
        data: {
          name: 'Administrador',
          role: 'admin'
        }
      }
    });
    
    if (signUpError) {
      console.error("Erro no signup:", signUpError);
      
      // Verificar se o erro é de usuário já registrado
      if (signUpError.message?.includes('User already registered')) {
        console.log("Usuário já existe, tentando fazer login para verificar");
        
        // Tentar fazer login para confirmar que o usuário existe e funciona
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email,
          password: adminPassword
        });
        
        if (signInError) {
          throw new Error("Usuário existe mas não foi possível fazer login. Verifique as credenciais.");
        }
        
        toast({
          title: "Administrador já existe",
          description: `O administrador com email ${email} já existe e as credenciais são válidas.`,
        });
        
        return adminPassword;
      }
      
      throw signUpError;
    }
    
    if (!data.user) {
      console.error("Nenhum usuário retornado após signup");
      throw new Error("Falha ao criar usuário");
    }
    
    console.log("Usuário criado com sucesso:", data.user.id);
    
    // Atualizar o perfil do usuário para administrador
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({ 
        id: data.user.id,
        email: email,
        name: 'Administrador', 
        role: 'admin' 
      });
    
    if (profileError) {
      console.error("Erro ao criar perfil:", profileError);
      throw profileError;
    }
    
    console.log("Perfil atualizado com sucesso");
    
    toast({
      title: "Administrador criado com sucesso",
      description: `O administrador ${email} foi criado com sucesso.`,
    });
    
    // Retornar a senha gerada ou usada
    return adminPassword;
    
  } catch (error: any) {
    console.error('Erro ao criar admin:', error);
    
    // Se o erro for de limite de requisições, dê uma mensagem mais amigável
    if (error?.status === 429 || (error?.message && error.message.includes("security purposes"))) {
      throw new Error(`Limite de requisições excedido. Por favor, aguarde alguns minutos e tente novamente.`);
    }
    
    throw error;
  }
};
