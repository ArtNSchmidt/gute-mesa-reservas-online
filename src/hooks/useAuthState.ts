
import { useState, useEffect } from 'react';
import { AuthState } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { verifyAdminAndGetData } from '@/utils/auth';
import { toast } from '@/components/ui/use-toast';

/**
 * Hook para gerenciar o estado de autenticação com Supabase
 */
export const useAuthState = () => {
  const [authState, setAuthState] = useState<AuthState>({
    admin: null,
    isAuthenticated: false,
    isLoading: true
  });

  // Verificar sessão ao carregar
  useEffect(() => {
    let isMounted = true;
    
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session) {
          if (isMounted) {
            setAuthState({
              admin: null,
              isAuthenticated: false,
              isLoading: false
            });
          }
          return;
        }
        
        // Se tem sessão, verificar se é admin
        const admin = await verifyAdminAndGetData(session.user.id);
        
        if (admin) {
          if (isMounted) {
            setAuthState({
              admin,
              isAuthenticated: true,
              isLoading: false
            });
          }
        } else {
          // Se não for admin, deslogar mas sem redirecionamento automático
          await supabase.auth.signOut();
          
          if (isMounted) {
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
        }
      } catch (error) {
        console.error('Erro ao verificar sessão:', error);
        if (isMounted) {
          setAuthState({
            admin: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      }
    };
    
    checkSession();
    
    // Ouvir mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        
        if (!isMounted) return;
        
        // Importante: não fazer operações assíncronas diretamente no callback
        if (event === 'SIGNED_OUT') {
          setAuthState({
            admin: null,
            isAuthenticated: false,
            isLoading: false
          });
          return;
        }
        
        if (session) {
          // Usar setTimeout para evitar deadlocks nos eventos de autenticação
          setTimeout(async () => {
            if (!isMounted) return;
            
            try {
              const admin = await verifyAdminAndGetData(session.user.id);
              
              if (admin) {
                setAuthState({
                  admin,
                  isAuthenticated: true,
                  isLoading: false
                });
              } else {
                // Se não for admin, não fazer logout automático aqui
                // para evitar loops. Apenas atualizar o estado.
                setAuthState({
                  admin: null,
                  isAuthenticated: false,
                  isLoading: false
                });
              }
            } catch (error) {
              console.error('Erro ao verificar admin:', error);
              setAuthState({
                admin: null,
                isAuthenticated: false,
                isLoading: false
              });
            }
          }, 0);
        }
      }
    );
    
    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return authState;
};
