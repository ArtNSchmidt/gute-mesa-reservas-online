
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

/**
 * Gerencia login com email e senha
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

/**
 * Gerencia a funcionalidade de logout
 */
export const handleLogout = async (): Promise<boolean> => {
  try {
    // Usar signOut sem parâmetros para fazer logout apenas da sessão atual
    await supabase.auth.signOut({ scope: 'local' });
    
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
