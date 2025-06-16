
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Reservation } from '@/types';
import { Calendar, Clock, Users, Mail, Phone, MessageSquare, Check, X, CheckCircle } from 'lucide-react';

interface ReservationGridProps {
  reservations: Reservation[];
  onUpdateStatus: (id: string, status: 'confirmed' | 'rejected' | 'completed') => void;
  formatDate: (dateString: string) => string;
}

const ReservationGrid: React.FC<ReservationGridProps> = ({
  reservations,
  onUpdateStatus,
  formatDate
}) => {
  const getStatusConfig = (status: string) => {
    const configs = {
      pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', label: 'Aguardando' },
      confirmed: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Confirmada' },
      completed: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Concluída' },
      rejected: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Rejeitada' },
      cancelled: { color: 'bg-gray-100 text-gray-800 border-gray-200', label: 'Cancelada' }
    };
    return configs[status as keyof typeof configs] || configs.pending;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {reservations.map((reservation) => {
        const statusConfig = getStatusConfig(reservation.status);
        
        return (
          <Card key={reservation.id} className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
              {/* Header com status */}
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg text-gray-900">
                    {reservation.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    ID: {reservation.id.slice(0, 8)}...
                  </p>
                </div>
                <Badge className={`${statusConfig.color} border`}>
                  {statusConfig.label}
                </Badge>
              </div>

              {/* Informações da reserva */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">
                    {formatDate(reservation.date)}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">
                    {reservation.time}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Users className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">
                    {reservation.guests} pessoas
                  </span>
                </div>
              </div>

              {/* Contato */}
              <div className="space-y-2 mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {reservation.email}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-700">
                    {reservation.phone}
                  </span>
                </div>
              </div>

              {/* Observações */}
              {reservation.special_requests && (
                <div className="mb-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700">
                      Observações:
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 bg-blue-50 p-2 rounded border-l-4 border-blue-200">
                    {reservation.special_requests}
                  </p>
                </div>
              )}

              {/* Ações */}
              <div className="flex space-x-2">
                {reservation.status === 'pending' && (
                  <>
                    <Button
                      size="sm"
                      onClick={() => onUpdateStatus(reservation.id, 'confirmed')}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => onUpdateStatus(reservation.id, 'rejected')}
                      className="flex-1"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Rejeitar
                    </Button>
                  </>
                )}
                
                {reservation.status === 'confirmed' && (
                  <Button
                    size="sm"
                    onClick={() => onUpdateStatus(reservation.id, 'completed')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Marcar como Concluída
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ReservationGrid;
