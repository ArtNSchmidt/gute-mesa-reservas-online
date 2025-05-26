
import React from 'react';
import { Reservation } from '@/types';
import ReservationCard from './ReservationCard';

interface ReservationsListProps {
  reservations: Reservation[];
  filter: 'all' | 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled';
  setFilter: (filter: 'all' | 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled') => void;
  updateReservationStatus: (id: string, status: 'confirmed' | 'rejected' | 'completed') => void;
  formatDate: (dateString: string) => string;
  isLoading?: boolean;
}

const ReservationsList: React.FC<ReservationsListProps> = ({
  reservations,
  filter,
  updateReservationStatus,
  formatDate,
  isLoading = false
}) => {
  const filteredReservations = reservations.filter(res => {
    if (filter === 'all') return true;
    return res.status === filter;
  });

  if (isLoading) {
    return (
      <div className="text-center py-12 text-[var(--brand-text-dark)]/70">
        <p>Carregando reservas...</p> {/* Consider adding a spinner icon here later if desired */}
      </div>
    );
  }

  if (filteredReservations.length === 0) {
    return (
      <div className="text-center py-12 bg-[var(--brand-background-light)] border border-dashed border-[var(--brand-primary)]/20 rounded-lg mt-4">
        <p className="text-[var(--brand-text-dark)]/70">
          {filter === 'all' 
            ? 'Não há reservas cadastradas.' 
            : `Não há reservas com status "${filter}".`}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4"> {/* Added mt-4 to give some space from the tabs */}
      {filteredReservations.map(reservation => (
        <ReservationCard
          key={reservation.id}
          reservation={reservation}
          formatDate={formatDate}
          onUpdateStatus={updateReservationStatus}
        />
      ))}
    </div>
  );
};

export default ReservationsList;
