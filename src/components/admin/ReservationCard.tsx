
import React from 'react';
import { Reservation } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import StatusBadge from './StatusBadge';
import { Button } from '@/components/ui/button';

interface ReservationCardProps {
  reservation: Reservation;
  formatDate: (dateString: string) => string;
  onUpdateStatus: (id: string, status: 'confirmed' | 'rejected' | 'completed' | 'cancelled') => void;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ reservation, formatDate, onUpdateStatus }) => {
  const { id, name, email, phone, date, time, guests, special_requests, status } = reservation;

  const isPending = status === 'pending';
  const isConfirmed = status === 'confirmed';

  return (
    <Card className="mb-4 bg-[var(--brand-background-light)] border border-[var(--brand-primary)]/10 shadow-sm hover:shadow-md transition-shadow duration-200 rounded-lg">
      <CardContent className="p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row flex-wrap justify-between items-start gap-3 sm:gap-4">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-[var(--brand-text-dark)]">{name}</h3>
            <div className="text-sm text-[var(--brand-text-dark)]/80 mt-1 space-y-0.5">
              <p><span className="font-medium">Email:</span> {email}</p>
              <p><span className="font-medium">Telefone:</span> {phone}</p>
            </div>
          </div>
          
          <div className="mt-2 sm:mt-0">
            <StatusBadge status={status} />
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-3 text-sm">
          <div>
            <p className="font-medium text-[var(--brand-text-dark)]/90">Data</p>
            <p className="text-[var(--brand-text-dark)]/80">{formatDate(date)}</p>
          </div>
          <div>
            <p className="font-medium text-[var(--brand-text-dark)]/90">Hora</p>
            <p className="text-[var(--brand-text-dark)]/80">{time}</p>
          </div>
          <div>
            <p className="font-medium text-[var(--brand-text-dark)]/90">Pessoas</p>
            <p className="text-[var(--brand-text-dark)]/80">{guests}</p>
          </div>
        </div>
        
        {special_requests && (
          <div className="mt-4">
            <p className="text-sm font-medium text-[var(--brand-text-dark)]/90">Observações</p>
            <p className="text-sm text-[var(--brand-text-dark)]/80 whitespace-pre-wrap">{special_requests}</p>
          </div>
        )}
        
        {(isPending || isConfirmed) && (
          <div className="mt-5 pt-4 border-t border-[var(--brand-primary)]/10 flex flex-wrap gap-2">
            {isPending && (
              <>
                <Button 
                  size="sm" 
                  onClick={() => onUpdateStatus(id, 'confirmed')}
                  className="bg-[var(--brand-primary)] text-[var(--brand-text-light)] hover:bg-[var(--brand-secondary)]"
                >
                  Confirmar Reserva
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => onUpdateStatus(id, 'rejected')}
                  className="border-[var(--brand-vinho-escuro)]/70 text-[var(--brand-vinho-escuro)]/90 hover:bg-[var(--brand-vinho-escuro)]/10 hover:text-[var(--brand-vinho-escuro)]"
                >
                  Rejeitar
                </Button>
              </>
            )}
            
            {isConfirmed && (
              <Button 
                size="sm" 
                onClick={() => onUpdateStatus(id, 'completed')}
                className="bg-[var(--brand-verde-musgo)] text-[var(--brand-text-light)] hover:bg-[var(--brand-verde-musgo)]/90"
              >
                Marcar como Concluída
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
