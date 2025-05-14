
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Reservation } from '@/types';
import StatusBadge from './StatusBadge';

interface ReservationCardProps {
  reservation: Reservation;
  onUpdateStatus: (id: string, status: 'confirmed' | 'rejected' | 'completed') => void;
  formatDate: (dateString: string) => string;
}

const ReservationCard: React.FC<ReservationCardProps> = ({ 
  reservation, 
  onUpdateStatus,
  formatDate 
}) => {
  return (
    <Card key={reservation.id} className="overflow-hidden">
      <CardHeader className="bg-gray-50 py-4 px-6 flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">{reservation.name}</CardTitle>
          <p className="text-sm text-gray-500">
            Data: {formatDate(reservation.date)} às {reservation.time} | {reservation.guests} pessoas
          </p>
        </div>
        <div>
          <StatusBadge status={reservation.status} />
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
          {reservation.special_requests && (
            <div className="col-span-1 sm:col-span-2">
              <h4 className="font-medium text-gray-500">Solicitações Especiais</h4>
              <p>{reservation.special_requests}</p>
            </div>
          )}
        </div>
        
        <div className="border-t pt-4 flex flex-wrap gap-2 justify-end">
          {reservation.status === 'pending' && (
            <>
              <Button 
                variant="outline" 
                className="border-green-500 text-green-600 hover:bg-green-50"
                onClick={() => onUpdateStatus(reservation.id, 'confirmed')}
              >
                Confirmar
              </Button>
              <Button 
                variant="outline" 
                className="border-red-500 text-red-600 hover:bg-red-50"
                onClick={() => onUpdateStatus(reservation.id, 'rejected')}
              >
                Rejeitar
              </Button>
            </>
          )}
          {reservation.status === 'confirmed' && (
            <Button 
              variant="outline" 
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={() => onUpdateStatus(reservation.id, 'completed')}
            >
              Marcar como Concluída
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ReservationCard;
