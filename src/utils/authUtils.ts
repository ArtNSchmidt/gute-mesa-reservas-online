
import { toast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Admin } from '@/types';

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
 * Handles logout functionality
 */
export const handleLogout = async (): Promise<boolean> => {
  try {
    await supabase.auth.signOut();
    
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    
    return true;
  } catch (error) {
    console.error('Logout failed:', error);
    toast({
      variant: "destructive",
      title: "Erro ao sair",
      description: "Não foi possível realizar o logout. Por favor, tente novamente.",
    });
    return false;
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
    
    // Verificar se o email já está registrado
    // Corrigindo o método para verificar usuários existentes
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 100, // Aumentar para garantir que podemos encontrar o usuário
    });
    
    if (listError) {
      console.error("Erro ao verificar usuários existentes:", listError);
      throw listError;
    }
    
    // Procurar pelo usuário com o email correspondente
    // Definindo explicitamente o tipo para resolver o erro
    const existingUser = existingUsers && existingUsers.users ? 
      existingUsers.users.find(user => user.email === email) : 
      undefined;
    
    if (existingUser) {
      console.log("Usuário já existe, enviando novo email de confirmação");
      
      // Se o usuário já existe, enviar um novo email de confirmação
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email
      });
      
      if (error) throw error;
      
      toast({
        title: "Email de confirmação reenviado",
        description: `Um novo email de confirmação foi enviado para ${email}. Verifique também a pasta de spam.`,
      });
      
      return null;
    }
    
    // Criar o usuário com signup, isso enviará um email de confirmação
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password: adminPassword,
      options: {
        emailRedirectTo: window.location.origin + "/admin/login",
        data: {
          name: 'Administrador'
        }
      }
    });
    
    if (signUpError) {
      console.error("Erro no signup:", signUpError);
      if (signUpError.message?.includes('User already registered')) {
        throw new Error('Este email já está registrado no sistema. Verifique seu email para confirmar a conta ou tente recuperar a senha.');
      }
      throw signUpError;
    }
    
    if (!signUpData?.user) {
      console.error("Nenhum usuário retornado após signup");
      throw new Error("Falha ao criar usuário");
    }
    
    console.log("Usuário criado com sucesso:", signUpData.user.id);
    
    // Atualizar o perfil do usuário para administrador
    const { error: profileError } = await supabase
      .from('profiles')
      .update({ 
        name: 'Administrador', 
        role: 'admin' 
      })
      .eq('id', signUpData.user.id);
    
    if (profileError) {
      console.error("Erro ao atualizar perfil:", profileError);
      throw profileError;
    }
    
    console.log("Perfil atualizado com sucesso");
    
    // Enviar um email de confirmação manualmente (mesmo que o Supabase já tenha enviado um)
    // para garantir que o email chegue
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

/**
 * Handles login with email and password
 */
export const handleLogin = async (email: string, password: string): Promise<void> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    
    if (data.user) {
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo ao painel administrativo.",
      });
    }
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Traduzir mensagens de erro comuns do Supabase
    if (error.message?.includes('Invalid login credentials')) {
      throw new Error('Credenciais inválidas. Verifique seu email e senha.');
    } else if (error.message?.includes('Email not confirmed')) {
      throw new Error('Email não confirmado. Verifique sua caixa de entrada para confirmar seu email.');
    } else {
      throw error;
    }
  }
};
