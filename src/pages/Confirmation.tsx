
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reservation } from '@/types';
import { Check, Calendar, Clock, Users, Info, ArrowLeft } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const Confirmation: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReservation = async () => {
      if (!id) return;

      try {
        const { data, error } = await supabase
          .from('reservations')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          throw error;
        }

        if (data) {
          setReservation(data as Reservation);
        } else {
          setError('Reserva não encontrada');
        }
      } catch (err: any) {
        console.error('Error fetching reservation:', err);
        setError(err.message || 'Erro ao buscar informações da reserva');
      } finally {
        setLoading(false);
      }
    };

    fetchReservation();
  }, [id]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('pt-BR');
  };

  const formatTime = (timeStr: string) => {
    return timeStr.substring(0, 5); // Pegar apenas HH:MM
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-lg">Carregando informações da reserva...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !reservation) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-xl text-center text-red-600">Erro</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p>{error || 'Não foi possível encontrar esta reserva'}</p>
              <Link to="/">
                <Button>
                  <ArrowLeft size={16} className="mr-2" /> Voltar para a página inicial
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12 px-4 bg-gray-50">
        <Card className="w-full max-w-2xl shadow-lg">
          <CardHeader className="bg-restaurant-forest-green text-white rounded-t-lg text-center p-6">
            <div className="mb-4 flex justify-center">
              <div className="bg-white rounded-full p-3">
                <Check className="h-10 w-10 text-restaurant-forest-green" />
              </div>
            </div>
            <CardTitle className="text-2xl font-playfair">Reserva Recebida!</CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="text-center mb-4">
              <p className="text-lg">
                Obrigado, <span className="font-semibold">{reservation.name}</span>. 
                Sua solicitação de reserva foi recebida com sucesso.
              </p>
              <p className="text-sm text-gray-600 mt-2">
                Um e-mail de confirmação foi enviado para {reservation.email}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-4 text-center">Detalhes da Reserva</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm">
                  <Calendar className="h-6 w-6 text-restaurant-forest-green mb-2" />
                  <span className="text-sm text-gray-500">Data</span>
                  <span className="font-medium">{formatDate(reservation.date)}</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm">
                  <Clock className="h-6 w-6 text-restaurant-forest-green mb-2" />
                  <span className="text-sm text-gray-500">Horário</span>
                  <span className="font-medium">{formatTime(reservation.time)}</span>
                </div>
                
                <div className="flex flex-col items-center p-3 bg-white rounded-md shadow-sm">
                  <Users className="h-6 w-6 text-restaurant-forest-green mb-2" />
                  <span className="text-sm text-gray-500">Pessoas</span>
                  <span className="font-medium">{reservation.guests}</span>
                </div>
              </div>

              {reservation.special_requests && (
                <div className="mt-4 p-3 bg-white rounded-md shadow-sm flex">
                  <Info className="h-5 w-5 text-restaurant-forest-green mr-2 flex-shrink-0" />
                  <div>
                    <span className="text-sm text-gray-500 block">Solicitações especiais</span>
                    <span className="text-sm">{reservation.special_requests}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-lg mb-2">Status: <span className="text-restaurant-forest-green">
                {reservation.status === 'pending' ? 'Pendente' : 
                 reservation.status === 'confirmed' ? 'Confirmada' : 
                 reservation.status === 'rejected' ? 'Rejeitada' : 
                 reservation.status === 'completed' ? 'Concluída' : 'Cancelada'}
              </span></h3>
              <p className="text-sm">
                {reservation.status === 'pending' ? 
                  'Aguarde a confirmação do restaurante. Entraremos em contato em breve.' : 
                  reservation.status === 'confirmed' ? 
                  'Sua reserva foi confirmada! Esperamos você no restaurante.' :
                  'Consulte seu email para mais informações sobre sua reserva.'}
              </p>
            </div>

            <div className="text-center pt-4">
              <Link to="/">
                <Button variant="outline" className="border-restaurant-forest-green text-restaurant-forest-green hover:bg-restaurant-forest-green/10">
                  <ArrowLeft size={16} className="mr-2" /> Voltar para a página inicial
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;
