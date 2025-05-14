
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Admin, AuthState } from '@/types';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
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
        setAuthState(prev => ({ ...prev, isLoading: true }));
        
        if (event === 'SIGNED_IN' && session) {
          await verifyAdminAndSetState(session.user.id);
        } else if (event === 'SIGNED_OUT') {
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
        
        navigate('/admin/dashboard');
      }
    } catch (error: any) {
      console.error('Login error:', error);
      toast({
        variant: "destructive",
        title: "Erro de login",
        description: error.message || "Email ou senha inválidos.",
      });
      
      throw error;
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

  return (
    <AuthContext.Provider value={{ authState, login, logout }}>
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
