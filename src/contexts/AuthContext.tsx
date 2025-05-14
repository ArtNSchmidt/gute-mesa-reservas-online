
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Admin, AuthState } from '@/types';
import { supabase } from '@/integrations/supabase/client';

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

  // Função para criar um novo administrador
  const createAdmin = async (email: string, password?: string): Promise<string> => {
    try {
      // Se não tiver uma senha, gera uma aleatória
      const adminPassword = password || Math.random().toString(36).slice(-10);
      
      // 1. Verificar se o usuário já existe usando a lista de usuários
      const { data: { users }, error: listError } = await supabase.auth.admin.listUsers({
        page: 1,
        perPage: 1000
      });
      
      if (listError) throw listError;
      
      const existingUser = users?.find(user => user.email === email);
      
      if (existingUser) {
        console.log('Usuário já existe, atualizando para admin');
        
        // Atualizar o perfil do usuário para administrador
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ 
            name: 'Administrador', 
            role: 'admin' 
          })
          .eq('id', existingUser.id);
        
        if (profileError) throw profileError;
        
        // Redefinir a senha do usuário existente
        const { error: passwordError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          { password: adminPassword }
        );
        
        if (passwordError) throw passwordError;
        
        return adminPassword;
      }
      
      // 2. Criar novo usuário se não existir
      const { data, error: authError } = await supabase.auth.admin.createUser({
        email,
        password: adminPassword,
        email_confirm: true,
        user_metadata: {
          name: 'Administrador'
        },
        role: 'authenticated'
      });
      
      if (authError) throw authError;
      
      if (!data.user) {
        throw new Error("Falha ao criar usuário");
      }
      
      // 3. Atualizar o perfil do usuário para administrador
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          name: 'Administrador', 
          role: 'admin' 
        })
        .eq('id', data.user.id);
      
      if (profileError) throw profileError;
      
      toast({
        title: "Administrador criado com sucesso",
        description: "O novo administrador pode fazer login com as credenciais criadas.",
      });
      
      return adminPassword;
      
    } catch (error: any) {
      console.error('Erro ao criar admin:', error);
      
      toast({
        variant: "destructive",
        title: "Erro ao criar admin",
        description: error.message || "Não foi possível criar o administrador.",
      });
      
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
