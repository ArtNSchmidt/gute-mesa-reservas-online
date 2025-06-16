
import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AdminHeader from '@/components/admin/AdminHeader';
import QuickActions from '@/components/admin/QuickActions';
import ReservationFilters from '@/components/admin/ReservationFilters';
import ReservationGrid from '@/components/admin/ReservationGrid';
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
  
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const handleLogout = async () => {
    await logout(() => navigate('/admin/login'));
  };

  // Filtrar e buscar reservas
  const filteredReservations = useMemo(() => {
    let filtered = reservations;

    // Filtrar por status
    if (filter !== 'all') {
      filtered = filtered.filter(r => r.status === filter);
    }

    // Buscar por termo
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(term) ||
        r.email.toLowerCase().includes(term) ||
        r.phone.includes(term)
      );
    }

    return filtered;
  }, [reservations, filter, searchTerm]);

  // Calcular estatísticas
  const reservationsCount = useMemo(() => ({
    pending: reservations.filter(r => r.status === 'pending').length,
    confirmed: reservations.filter(r => r.status === 'confirmed').length,
    total: reservations.length
  }), [reservations]);

  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!authState.isAuthenticated && !redirecting) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center bg-gray-50">
          <div className="text-center max-w-md mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Acesso Negado
            </h2>
            <p className="text-gray-600 mb-6">
              Você precisa estar autenticado como administrador para acessar esta página.
            </p>
            <Button 
              onClick={() => navigate('/admin/login')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Fazer Login
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header do Admin */}
      <AdminHeader
        authState={authState}
        reservationsCount={reservationsCount}
        onLogout={handleLogout}
      />

      {/* Filtros */}
      <ReservationFilters
        reservations={reservations}
        filter={filter}
        setFilter={setFilter}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Conteúdo Principal */}
      <div className="flex-1 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
            {/* Ações Rápidas */}
            <div className="lg:col-span-1">
              <QuickActions />
            </div>

            {/* Área Principal de Reservas */}
            <div className="lg:col-span-3">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Carregando reservas...</p>
                </div>
              ) : filteredReservations.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
                  <div className="max-w-md mx-auto">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Nenhuma reserva encontrada
                    </h3>
                    <p className="text-gray-600">
                      {searchTerm 
                        ? 'Tente ajustar sua busca ou filtros.'
                        : filter === 'all' 
                          ? 'Ainda não há reservas cadastradas.'
                          : `Não há reservas com status "${filter}".`
                      }
                    </p>
                  </div>
                </div>
              ) : (
                <ReservationGrid
                  reservations={filteredReservations}
                  onUpdateStatus={updateReservationStatus}
                  formatDate={formatDate}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
