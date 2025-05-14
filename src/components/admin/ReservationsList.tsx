
import React from 'react';
import { Button } from '@/components/ui/button';
import { Reservation } from '@/types';
import ReservationCard from './ReservationCard';

interface ReservationsListProps {
  reservations: Reservation[];
  filter: 'all' | 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';
  setFilter: (filter: 'all' | 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled') => void;
  updateReservationStatus: (id: string, status: 'confirmed' | 'rejected' | 'completed') => void;
  formatDate: (dateString: string) => string;
}

const ReservationsList: React.FC<ReservationsListProps> = ({
  reservations,
  filter,
  setFilter,
  updateReservationStatus,
  formatDate
}) => {
  const filteredReservations = filter === 'all'
    ? reservations
    : reservations.filter((res) => res.status === filter);

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
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          onUpdateStatus={updateReservationStatus}
          formatDate={formatDate}
        />
      ))}
    </div>
  );
};

export default ReservationsList;
