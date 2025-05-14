
import { supabase } from '@/integrations/supabase/client';
import { Admin } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { User } from '@supabase/supabase-js';

/**
 * Verifies if a user ID belongs to an admin and returns admin data
 */
export const verifyAdminAndGetData = async (userId: string): Promise<Admin | null> => {
  try {
    // Verificar se o usuário é admin
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();
      
    if (profileError) throw profileError;
    
    if (profileData && profileData.role === 'admin') {
      return {
        email: profileData.email,
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
 * Creates a new admin user
 */
export const createAdminUser = async (email: string, password?: string): Promise<string | null> => {
  try {
    // Se não tiver uma senha, gera uma aleatória
    const adminPassword = password || Math.random().toString(36).slice(-10);
    
    console.log("Iniciando criação de administrador com email:", email);
    
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password: adminPassword,
      options: {
        emailRedirectTo: window.location.origin + "/admin/login",
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
        // Tentar reenviar o email de confirmação
        const { error: resendError } = await supabase.auth.resend({
          type: 'signup',
          email: email
        });
        
        if (resendError) throw resendError;
        
        toast({
          title: "Email de confirmação reenviado",
          description: `Um novo email de confirmação foi enviado para ${email}. Verifique também a pasta de spam.`,
        });
        
        return null;
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
      .update({ 
        name: 'Administrador', 
        role: 'admin' 
      })
      .eq('id', data.user.id);
    
    if (profileError) {
      console.error("Erro ao atualizar perfil:", profileError);
      throw profileError;
    }
    
    console.log("Perfil atualizado com sucesso");
    
    // Enviar um email de confirmação manualmente
    await supabase.auth.resend({
      type: 'signup',
      email: email,
    });
    
    toast({
      title: "Email de confirmação enviado",
      description: `Um email de confirmação foi enviado para ${email}. Verifique também a pasta de spam.`,
    });
    
    // Retornar a senha gerada, para caso a confirmação de email esteja desativada
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
