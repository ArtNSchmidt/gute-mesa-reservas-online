
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/admin/DashboardHeader';
import DashboardTabs from '@/components/admin/DashboardTabs';
import { useReservations } from '@/hooks/useReservations';
import { useAuthRedirect } from '@/hooks/useAuthRedirect';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/dateFormatter';
import { useAuth } from '@/contexts/AuthContext';

const Dashboard: React.FC = () => {
  const { authState, logout } = useAuth();
  const navigate = useNavigate();
  const { redirecting } = useAuthRedirect(authState, '/admin/login');
  const { reservations, isLoading, updateReservationStatus } = useReservations(authState.isAuthenticated);

  // Corrigindo o tipo retornado para Promise<void>
  const handleLogout = async () => {
    await logout(() => navigate('/admin/login'));
  };

  // Mostrar tela de carregamento enquanto verifica a autenticação
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

  // Se não estiver autenticado mas ainda não foi redirecionado, mostrar mensagem
  if (!authState.isAuthenticated && !redirecting) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 py-12 bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl mb-4">Você não está autenticado.</p>
            <Button 
              onClick={() => navigate('/admin/login')}
              className="bg-restaurant-forest-green"
            >
              Ir para o Login
            </Button>
          </div>
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
          <DashboardHeader authState={authState} onLogout={handleLogout} />

          <div className="bg-white shadow-md rounded-lg p-6">
            <DashboardTabs 
              reservations={reservations}
              isLoading={isLoading}
              updateReservationStatus={updateReservationStatus}
              formatDate={formatDate}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
