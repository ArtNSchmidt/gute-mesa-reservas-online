
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Reservation } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import ReservationsList from '@/components/admin/ReservationsList';

const Dashboard: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    if (!authState.isAuthenticated) {
      navigate('/admin/login');
    }
  }, [authState.isAuthenticated, navigate]);

  useEffect(() => {
    // In a real app, this would be an API call to fetch reservations
    const fetchReservations = () => {
      try {
        const storedReservations = JSON.parse(localStorage.getItem('reservations') || '[]') as Reservation[];
        setReservations(storedReservations);
      } catch (error) {
        console.error('Failed to fetch reservations:', error);
      }
    };

    fetchReservations();
  }, []);

  const updateReservationStatus = (id: string, status: 'confirmed' | 'rejected' | 'completed') => {
    const updatedReservations = reservations.map((res) => {
      if (res.id === id) {
        return { ...res, status };
      }
      return res;
    });

    setReservations(updatedReservations);
    localStorage.setItem('reservations', JSON.stringify(updatedReservations));

    const statusMessages = {
      confirmed: 'Reserva confirmada com sucesso!',
      rejected: 'Reserva rejeitada.',
      completed: 'Reserva marcada como concluída!'
    };

    toast({
      title: statusMessages[status],
      description: `A reserva foi ${status === 'confirmed' ? 'confirmada' : status === 'rejected' ? 'rejeitada' : 'concluída'}.`,
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
            <p className="text-gray-600">
              Bem-vindo, {authState.admin?.name || 'Administrador'}. Gerencie as reservas do restaurante.
            </p>
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
                  />
                </TabsContent>
                <TabsContent value="pending" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                  />
                </TabsContent>
                <TabsContent value="confirmed" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                  />
                </TabsContent>
                <TabsContent value="rejected" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                  />
                </TabsContent>
                <TabsContent value="completed" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
                  />
                </TabsContent>
                <TabsContent value="cancelled" className="mt-4">
                  <ReservationsList 
                    reservations={reservations}
                    filter={filter}
                    setFilter={setFilter}
                    updateReservationStatus={updateReservationStatus}
                    formatDate={formatDate}
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
