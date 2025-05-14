
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Reservation } from '@/types';
import StatusBadge from './StatusBadge';
import { Check, X } from 'lucide-react';

interface ReservationsManagerProps {
  reservations: Reservation[];
  updateReservationStatus: (id: string, status: 'confirmed' | 'rejected' | 'completed') => void;
  formatDate: (dateString: string) => string;
  isLoading: boolean;
  filter: string;
}

const ReservationsManager: React.FC<ReservationsManagerProps> = ({
  reservations,
  updateReservationStatus,
  formatDate,
  isLoading,
  filter
}) => {
  const filteredReservations = reservations.filter(res => {
    if (filter === 'all') return true;
    return res.status === filter;
  });

  if (isLoading) {
    return <div className="text-center py-8">Carregando reservas...</div>;
  }

  if (filteredReservations.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-md">
        <p className="text-gray-500">
          {filter === 'all' 
            ? 'Não há reservas cadastradas.' 
            : `Não há reservas com status "${filter}".`}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableCaption>Lista de reservas {filter !== 'all' ? `com status ${filter}` : ''}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Contato</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Hora</TableHead>
            <TableHead>Pessoas</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredReservations.map((reservation) => (
            <TableRow key={reservation.id}>
              <TableCell className="font-medium">{reservation.name}</TableCell>
              <TableCell>
                <div className="text-sm">
                  <p>{reservation.email}</p>
                  <p>{reservation.phone}</p>
                </div>
              </TableCell>
              <TableCell>{formatDate(reservation.date)}</TableCell>
              <TableCell>{reservation.time}</TableCell>
              <TableCell>{reservation.guests}</TableCell>
              <TableCell>
                <StatusBadge status={reservation.status} />
              </TableCell>
              <TableCell className="text-right">
                {reservation.status === 'pending' && (
                  <div className="flex justify-end space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="bg-green-600 hover:bg-green-700 text-white"
                      onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                    >
                      <Check className="h-4 w-4 mr-1" /> Aprovar
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive"
                      onClick={() => updateReservationStatus(reservation.id, 'rejected')}
                    >
                      <X className="h-4 w-4 mr-1" /> Rejeitar
                    </Button>
                  </div>
                )}
                {reservation.status === 'confirmed' && (
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                    onClick={() => updateReservationStatus(reservation.id, 'completed')}
                  >
                    Concluir
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReservationsManager;
