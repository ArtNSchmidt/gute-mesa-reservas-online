
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
        console.log(`Checking admin status for user ID: ${session.user.id}`);
        try {
          const admin = await verifyAdminAndGetData(session.user.id);
          console.log(`Admin status check result for ${session.user.id}: ${JSON.stringify(admin)}`);
          
          if (admin) {
            if (isMounted) {
              setAuthState({
                admin,
                isAuthenticated: true,
                isLoading: false
              });
            }
          } else {
            // Se não for admin, não deslogar. Apenas atualizar o estado.
            // O verifyAdminAndGetData já loga os detalhes do porquê não é admin
            // ou se houve erro.
            // Mostrar toast apenas se o perfil foi carregado mas não é admin.
            // O verifyAdminAndGetData retorna null tanto para "não admin" quanto para "erro ao buscar perfil"
            // Precisamos de uma forma de distinguir ou assumir que se admin é null e não houve erro aqui,
            // foi uma falha na verificação de admin (perfil não admin ou não encontrado).
            // Para simplificar, vamos assumir que se admin é null, o toast é pertinente
            // a menos que um erro específico tenha sido capturado abaixo.
            if (isMounted) {
              // Verificando se o usuário existe, mas não é admin para mostrar o Toast.
              // Esta lógica pode precisar de ajuste dependendo de como verifyAdminAndGetData lida com erros vs não-admin.
              // Por agora, se admin é null e não houve erro capturado aqui, consideramos não-admin.
              const { data: profileData } = await supabase
                .from('profiles')
                .select('role')
                .eq('id', session.user.id)
                .single();

              if (profileData && profileData.role !== 'admin') {
                toast({
                  title: "Acesso negado",
                  description: "Você não tem permissão para acessar o painel administrativo.",
                  variant: "destructive"
                });
              }
              
              setAuthState({
                admin: null,
                isAuthenticated: false,
                isLoading: false
              });
            }
          }
        } catch (error: any) {
          console.error(`Error during admin verification for ${session.user.id}: ${error.message}`);
          if (isMounted) {
            setAuthState({
              admin: null,
              isAuthenticated: false,
              isLoading: false
            });
          }
        }
      } catch (error) { // Catch para o try do checkSession
        console.error('Erro geral ao verificar sessão:', error); // Mudado para erro geral
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
              console.log(`Checking admin status for user ID: ${session.user.id}`);
              const admin = await verifyAdminAndGetData(session.user.id);
              console.log(`Admin status check result for ${session.user.id}: ${JSON.stringify(admin)}`);
              
              if (admin) {
                setAuthState({
                  admin,
                  isAuthenticated: true,
                  isLoading: false
                });
              } else {
                // Se não for admin, não deslogar. Apenas atualizar o estado.
                // O verifyAdminAndGetData já loga os detalhes.
                // Mostrar toast apenas se o perfil foi carregado mas não é admin.
                const { data: profileData } = await supabase
                  .from('profiles')
                  .select('role')
                  .eq('id', session.user.id)
                  .single();

                if (profileData && profileData.role !== 'admin') {
                   // Não mostrar toast aqui para evitar duplicidade com checkSession
                   // e potenciais loops de notificação em mudanças rápidas de estado.
                   // A lógica de toast é mais crítica no checkSession inicial.
                }

                setAuthState({
                  admin: null,
                  isAuthenticated: false,
                  isLoading: false
                });
              }
            } catch (error: any) {
              console.error(`Error during admin verification for ${session.user.id}: ${error.message}`);
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
