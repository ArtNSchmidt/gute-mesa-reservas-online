
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Reservation } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import ReservationsList from '@/components/admin/ReservationsList';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { LogOut, UserPlus } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authState.isLoading && !authState.isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authState.isAuthenticated, authState.isLoading, navigate]);

  useEffect(() => {
    const fetchReservations = async () => {
      if (!authState.isAuthenticated) return;
      
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

    fetchReservations();
  }, [authState.isAuthenticated]);

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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
          <p>Carregando...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <header className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
              <p className="text-gray-600">
                Bem-vindo, {authState.admin?.name || 'Administrador'}. Gerencie as reservas do restaurante.
              </p>
            </div>
            <div className="flex space-x-4">
              <Button 
                onClick={() => navigate('/admin/create-admin')} 
                variant="outline" 
                className="border-restaurant-forest-green text-restaurant-forest-green hover:bg-restaurant-forest-green/10"
              >
                <UserPlus className="mr-2 h-4 w-4" /> Novo Admin
              </Button>
              <Button 
                onClick={() => logout()} 
                variant="outline" 
                className="border-restaurant-dark-wine text-restaurant-dark-wine hover:bg-restaurant-dark-wine/10"
              >
                <LogOut className="mr-2 h-4 w-4" /> Sair
              </Button>
            </div>
          </header>

          <div className="bg-white shadow-md rounded-lg p-6">
            <div className="mb-6">
              <h2 className="text-xl font-bold mb-4">Reservas</h2>
              <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
                <div className="overflow-x-auto pb-2">
                  <TabsList>
                    <TabsTrigger value="all">Todas</TabsTrigger>
                    <TabsTrigger value="pending">Pendentes</TabsTrigger>
                    <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
                    <TabsTrigger value="rejected">Rejeitadas</TabsTrigger>
                    <TabsTrigger value="completed">Concluídas</TabsTrigger>
                    <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                    isLoading={isLoading}
                  />
                </TabsContent>
                <TabsContent value="pending" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                    isLoading={isLoading}
                  />
                </TabsContent>
                <TabsContent value="confirmed" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                    isLoading={isLoading}
                  />
                </TabsContent>
                <TabsContent value="rejected" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                    isLoading={isLoading}
                  />
                </TabsContent>
                <TabsContent value="completed" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                    isLoading={isLoading}
                  />
                </TabsContent>
                <TabsContent value="cancelled" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                    isLoading={isLoading}
                  />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
