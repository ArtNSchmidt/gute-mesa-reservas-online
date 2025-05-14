
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Reservation } from '@/types';
import { toast } from '@/components/ui/use-toast';

export const useReservations = (isAuthenticated: boolean) => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!isAuthenticated) return;
      
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('reservations')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
        setReservations(data as Reservation[]);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar as reservas.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchReservations();
    }
  }, [isAuthenticated]);

  const updateReservationStatus = async (id: string, status: 'confirmed' | 'rejected' | 'completed') => {
    try {
      const { error } = await supabase
        .from('reservations')
        .update({ status })
        .eq('id', id);
        
      if (error) throw error;

      setReservations(prev => 
        prev.map((res) => {
          if (res.id === id) {
            return { ...res, status };
          }
          return res;
        })
      );

      const statusMessages = {
        confirmed: 'Reserva confirmada com sucesso!',
        rejected: 'Reserva rejeitada.',
        completed: 'Reserva marcada como concluída!'
      };

      toast({
        title: statusMessages[status],
        description: `A reserva foi ${status === 'confirmed' ? 'confirmada' : status === 'rejected' ? 'rejeitada' : 'concluída'}.`,
      });
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status da reserva.',
        variant: 'destructive',
      });
    }
  };

  return { reservations, isLoading, updateReservationStatus };
};
