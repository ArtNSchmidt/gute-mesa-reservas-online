
import { useState, useEffect } from 'react';
import { AuthState } from '@/types';
import { supabase } from '@/integrations/supabase/client';
import { verifyAdminAndGetData } from '@/utils/authUtils';
import { toast } from '@/components/ui/use-toast';

/**
 * Hook to manage authentication state with Supabase
 */
export const useAuthState = () => {
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
          const admin = await verifyAdminAndGetData(session.user.id);
          
          if (admin) {
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
      (event, session) => {
        console.log('Auth state changed:', event, session);
        
        // Importante: não fazer operações assíncronas diretamente no callback
        // para evitar deadlocks no sistema de eventos do Supabase
        setAuthState(prev => ({ ...prev, isLoading: true }));
        
        if (session) {
          // Usar setTimeout para evitar deadlocks nos eventos de autenticação
          setTimeout(() => {
            const checkAdmin = async () => {
              const admin = await verifyAdminAndGetData(session.user.id);
              
              if (admin) {
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
            };
            
            checkAdmin();
          }, 0);
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
  }, []);

  return authState;
};
