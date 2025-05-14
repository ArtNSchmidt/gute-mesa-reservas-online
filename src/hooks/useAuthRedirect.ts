
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthState } from '@/types';

export const useAuthRedirect = (authState: AuthState, targetPath: string) => {
  const navigate = useNavigate();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated && !redirecting) {
      console.log(`Redirecionando para ${targetPath}: não autenticado e carregamento finalizado`);
      setRedirecting(true);
      
      // Pequeno delay para evitar loops de redirecionamento
      const timer = setTimeout(() => {
        navigate(targetPath);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [authState.isAuthenticated, authState.isLoading, navigate, redirecting, targetPath]);

  return { redirecting };
};
