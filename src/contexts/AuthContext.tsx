
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast';
import { Admin, AuthState } from '@/types';

interface AuthContextProps {
  authState: AuthState;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const [authState, setAuthState] = useState<AuthState>({
    admin: null,
    isAuthenticated: false,
    isLoading: false
  });

  const login = async (email: string, password: string): Promise<void> => {
    setAuthState(prev => ({ ...prev, isLoading: true }));
    
    try {
      // Mock authentication - in a real app, this would be an API call
      if (email === 'arturnogschmidt1@hotmail.com' && password === '12345678') {
        const admin: Admin = {
          email,
          name: 'Administrador'
        };
        
        // Store authentication info in localStorage
        localStorage.setItem('admin', JSON.stringify(admin));
        
        setAuthState({
          admin,
          isAuthenticated: true,
          isLoading: false
        });
        
        navigate('/admin/dashboard');
        
        toast({
          title: "Login realizado com sucesso",
          description: "Bem-vindo ao painel administrativo.",
        });
      } else {
        throw new Error('Credenciais inválidas');
      }
    } catch (error) {
      setAuthState({
        admin: null,
        isAuthenticated: false,
        isLoading: false
      });
      
      toast({
        variant: "destructive",
        title: "Erro de login",
        description: "Email ou senha inválidos.",
      });
    }
  };

  const logout = () => {
    localStorage.removeItem('admin');
    setAuthState({
      admin: null,
      isAuthenticated: false,
      isLoading: false
    });
    navigate('/admin/login');
    
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
  };

  // Check for existing login when the component mounts
  React.useEffect(() => {
    const storedAdmin = localStorage.getItem('admin');
    if (storedAdmin) {
      try {
        const admin = JSON.parse(storedAdmin) as Admin;
        setAuthState({
          admin,
          isAuthenticated: true,
          isLoading: false
        });
      } catch (error) {
        localStorage.removeItem('admin');
      }
    }
  }, []);

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
