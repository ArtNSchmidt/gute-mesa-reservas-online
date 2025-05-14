
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
    <Card className="mb-4">
      <CardContent className="p-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <div className="text-sm text-gray-600 mt-1">
              <p>{email}</p>
              <p>{phone}</p>
            </div>
          </div>
          
          <StatusBadge status={status} />
        </div>
        
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm font-medium">Data</p>
            <p className="text-sm">{formatDate(date)}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Hora</p>
            <p className="text-sm">{time}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Pessoas</p>
            <p className="text-sm">{guests}</p>
          </div>
        </div>
        
        {special_requests && (
          <div className="mt-4">
            <p className="text-sm font-medium">Observações</p>
            <p className="text-sm text-gray-600">{special_requests}</p>
          </div>
        )}
        
        {isPending && (
          <div className="mt-4 flex flex-wrap gap-2">
            <Button 
              size="sm" 
              variant="default"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => onUpdateStatus(id, 'confirmed')}
            >
              Confirmar
            </Button>
            <Button 
              size="sm" 
              variant="destructive"
              onClick={() => onUpdateStatus(id, 'rejected')}
            >
              Rejeitar
            </Button>
          </div>
        )}
        
        {isConfirmed && (
          <div className="mt-4">
            <Button 
              size="sm" 
              variant="default"
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => onUpdateStatus(id, 'completed')}
            >
              Marcar como Concluída
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
