
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Admin, AuthState } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  createAdmin: (email: string, password?: string) => Promise<string>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    admin: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Verificar sessão ao carregar
  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          await verifyAdminAndSetState(session.user.id);
        } else {
          setAuthState({
            admin: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        setAuthState({
          admin: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    };
    
    checkSession();
    
    // Ouvir mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session);
        setAuthState(prev => ({ ...prev, isLoading: true }));
        
        if (session) {
          await verifyAdminAndSetState(session.user.id);
        } else {
          setAuthState({
            admin: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      }
    );
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  // Função auxiliar para verificar se o usuário é admin
  const verifyAdminAndSetState = async (userId: string) => {
    try {
      // Verificar se o usuário é admin
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (profileError) throw profileError;
      
      if (profileData && profileData.role === 'admin') {
        const admin: Admin = {
          email: profileData.email,
          name: profileData.name || 'Administrador'
        };
        
        setAuthState({
          admin,
          isAuthenticated: true,
          isLoading: false
        });
        
        // Se estamos na página de login e já autenticado, redirecionar
        const currentPath = window.location.pathname;
        if (currentPath === '/admin/login') {
          navigate('/admin/dashboard');
        }
      } else {
        // Se não for admin, deslogar
        await supabase.auth.signOut();
        
        toast({
          title: "Acesso negado",
          description: "Você não tem permissão para acessar o painel administrativo.",
          variant: "destructive"
        });
        
        setAuthState({
          admin: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    } catch (error) {
      console.error('Erro ao verificar perfil:', error);
      setAuthState({
        admin: null,
        isAuthenticated: false,
        isLoading: false
      });
    }
  };

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Verificação do perfil é feita no listener de auth state
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

  const logout = async (): Promise<void> => {
    try {
      await supabase.auth.signOut();
      
      toast({
        title: "Logout realizado",
        description: "Você foi desconectado com sucesso.",
      });
      
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        variant: "destructive",
        title: "Erro ao sair",
        description: "Não foi possível realizar o logout. Por favor, tente novamente.",
      });
    }
  };

  // Função para criar um novo administrador
  const createAdmin = async (email: string, password?: string): Promise<string> => {
    try {
      // Se não tiver uma senha, gera uma aleatória
      const adminPassword = password || Math.random().toString(36).slice(-10);
      
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
        // Traduzir mensagens de erro comuns
        if (signUpError.message?.includes('User already registered')) {
          throw new Error('Este email já está registrado no sistema.');
        }
        throw signUpError;
      }
      
      if (!signUpData.user) {
        throw new Error("Falha ao criar usuário");
      }
      
      // Atualizar o perfil do usuário para administrador
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          name: 'Administrador', 
          role: 'admin' 
        })
        .eq('id', signUpData.user.id);
      
      if (profileError) throw profileError;
      
      // Retornar a senha gerada, mas também mostrar no toast
      toast({
        title: "Email de confirmação enviado",
        description: "Um email de confirmação foi enviado para o novo administrador.",
      });
      
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

  return (
    <AuthContext.Provider value={{ authState, login, logout, createAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
