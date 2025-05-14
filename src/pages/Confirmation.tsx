
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Reservation } from '@/types';
import { Check } from 'lucide-react';

const Confirmation = () => {
  const { id } = useParams<{ id: string }>();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be an API call
    const fetchReservation = () => {
      try {
        const storedReservations: Reservation[] = JSON.parse(localStorage.getItem('reservations') || '[]');
        const foundReservation = storedReservations.find(res => res.id === id);
        
        if (foundReservation) {
          setReservation(foundReservation);
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch reservation:', error);
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl">Carregando informações...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!reservation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <h2 className="text-2xl font-bold mb-4">Reserva não encontrada</h2>
            <p className="mb-6">Não conseguimos encontrar os detalhes desta reserva. Por favor, verifique se você tem o link correto ou entre em contato conosco.</p>
            <Button asChild>
              <Link to="/#reservation">Nova Reserva</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
              <Check className="h-8 w-8 text-restaurant-medium-green" />
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Solicitação de Reserva Recebida!
            </h1>
            
            <Card className="shadow-lg border-restaurant-medium-green/20">
              <CardHeader className="bg-restaurant-light-green border-b border-restaurant-medium-green/20">
                <CardTitle className="text-center text-restaurant-dark-gray">
                  Detalhes da Reserva
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium text-gray-500">Nome</h3>
                    <p className="text-lg">{reservation.name}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Número de Pessoas</h3>
                    <p className="text-lg">{reservation.guests}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Data</h3>
                    <p className="text-lg">{formatDate(reservation.date)}</p>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-500">Hora</h3>
                    <p className="text-lg">{reservation.time}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="font-medium text-gray-500">Email</h3>
                    <p className="text-lg">{reservation.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <h3 className="font-medium text-gray-500">Telefone</h3>
                    <p className="text-lg">{reservation.phone}</p>
                  </div>
                  {reservation.special_requests && (
                    <div className="sm:col-span-2">
                      <h3 className="font-medium text-gray-500">Solicitações Especiais</h3>
                      <p className="text-lg">{reservation.special_requests}</p>
                    </div>
                  )}
                  <div className="sm:col-span-2 mt-2">
                    <h3 className="font-medium text-gray-500">Status</h3>
                    <p className="text-lg capitalize bg-yellow-100 text-yellow-800 inline-block px-3 py-1 rounded-full text-sm">
                      {reservation.status === 'pending' ? 'Aguardando confirmação' : reservation.status}
                    </p>
                  </div>
                </div>
                
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="text-center space-y-6">
                    <p>
                      Obrigado por escolher a Taberna do Gute! Entraremos em contato por email em breve para confirmar sua reserva.
                    </p>
                    <Button asChild>
                      <Link to="/" className="bg-restaurant-dark-teal hover:bg-restaurant-dark-gray">
                        Voltar para a página inicial
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-8 text-center text-gray-500 text-sm">
              <p>Em caso de dúvidas, entre em contato pelo telefone (85) 99999-9999</p>
              <p>Número de confirmação: {reservation.id}</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Confirmation;
