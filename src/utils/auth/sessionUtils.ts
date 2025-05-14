
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

/**
 * Realiza o login do usuário com email e senha
 */
export const handleLogin = async (email: string, password: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('Login error:', error);
      throw error;
    }
    
    console.log('Login successful:', data.user?.id);
    
    toast({
      title: "Login realizado com sucesso",
      description: "Você será redirecionado para o painel administrativo.",
    });
    
    return true;
  } catch (error: any) {
    console.error('Login error:', error);
    
    // Tratar erros comuns
    if (error.message) {
      if (error.message.includes('Invalid login credentials')) {
        throw new Error('Email ou senha inválidos. Verifique suas credenciais e tente novamente.');
      }
      else if (error.message.includes('Email not confirmed')) {
        throw new Error('Email não confirmado. Por favor, verifique seu email e confirme sua conta.');
      }
    }
    
    throw error;
  }
};

/**
 * Realiza o logout do usuário
 */
export const handleLogout = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Logout error:', error);
      throw error;
    }
    
    console.log('Logout successful');
    
    toast({
      title: "Logout realizado com sucesso",
      description: "Você foi desconectado do sistema.",
    });
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    throw error;
  }
};
