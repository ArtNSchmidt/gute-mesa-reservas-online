
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { Reservation } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';

const Dashboard: React.FC = () => {
  const { authState } = useAuth();
  const navigate = useNavigate();
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected' | 'completed'>('all');

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

  const getFilteredReservations = () => {
    if (filter === 'all') {
      return reservations;
    }
    return reservations.filter((res) => res.status === filter);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'confirmed':
        return 'Confirmado';
      case 'rejected':
        return 'Rejeitado';
      case 'completed':
        return 'Concluído';
      default:
        return status;
    }
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
                  </TabsList>
                </div>

                <TabsContent value="all" className="mt-4">
                  {renderReservationsList(getFilteredReservations())}
                </TabsContent>
                <TabsContent value="pending" className="mt-4">
                  {renderReservationsList(getFilteredReservations())}
                </TabsContent>
                <TabsContent value="confirmed" className="mt-4">
                  {renderReservationsList(getFilteredReservations())}
                </TabsContent>
                <TabsContent value="rejected" className="mt-4">
                  {renderReservationsList(getFilteredReservations())}
                </TabsContent>
                <TabsContent value="completed" className="mt-4">
                  {renderReservationsList(getFilteredReservations())}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );

  function renderReservationsList(filteredReservations: Reservation[]) {
    if (filteredReservations.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Nenhuma reserva encontrada.</p>
          {filter !== 'all' && (
            <Button variant="outline" onClick={() => setFilter('all')}>
              Ver todas as reservas
            </Button>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {filteredReservations.map((reservation) => (
          <Card key={reservation.id} className="overflow-hidden">
            <CardHeader className="bg-gray-50 py-4 px-6 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-medium">{reservation.name}</CardTitle>
                <p className="text-sm text-gray-500">
                  Data: {formatDate(reservation.date)} às {reservation.time} | {reservation.guests} pessoas
                </p>
              </div>
              <div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(reservation.status)}`}>
                  {getStatusText(reservation.status)}
                </span>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium text-gray-500">Email</h4>
                  <p>{reservation.email}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-500">Telefone</h4>
                  <p>{reservation.phone}</p>
                </div>
                {reservation.specialRequests && (
                  <div className="col-span-1 sm:col-span-2">
                    <h4 className="font-medium text-gray-500">Solicitações Especiais</h4>
                    <p>{reservation.specialRequests}</p>
                  </div>
                )}
              </div>
              
              <div className="border-t pt-4 flex flex-wrap gap-2 justify-end">
                {reservation.status === 'pending' && (
                  <>
                    <Button 
                      variant="outline" 
                      className="border-green-500 text-green-600 hover:bg-green-50"
                      onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                    >
                      Confirmar
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-red-500 text-red-600 hover:bg-red-50"
                      onClick={() => updateReservationStatus(reservation.id, 'rejected')}
                    >
                      Rejeitar
                    </Button>
                  </>
                )}
                {reservation.status === 'confirmed' && (
                  <Button 
                    variant="outline" 
                    className="border-blue-500 text-blue-600 hover:bg-blue-50"
                    onClick={() => updateReservationStatus(reservation.id, 'completed')}
                  >
                    Marcar como Concluída
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }
};

export default Dashboard;
