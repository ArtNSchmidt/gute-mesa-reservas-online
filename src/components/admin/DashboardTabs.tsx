
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Reservation } from '@/types';
import ReservationsList from '@/components/admin/ReservationsList';
import ReservationsManager from '@/components/admin/ReservationsManager';

interface DashboardTabsProps {
  reservations: Reservation[];
  isLoading: boolean;
  updateReservationStatus: (id: string, status: 'confirmed' | 'rejected' | 'completed') => Promise<void>;
  formatDate: (dateString: string) => string;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ 
  reservations, 
  isLoading, 
  updateReservationStatus,
  formatDate 
}) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'rejected' | 'completed' | 'cancelled'>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Reservas</h2>
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'cards' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('cards')}
          >
            Cartões
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('table')}
          >
            Tabela
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <div className="overflow-x-auto pb-2">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="pending">Pendentes</TabsTrigger>
            <TabsTrigger value="confirmed">Confirmadas</TabsTrigger>
            <TabsTrigger value="rejected">Rejeitadas</TabsTrigger>
            <TabsTrigger value="completed">Concluídas</TabsTrigger>
            <TabsTrigger value="cancelled">Canceladas</TabsTrigger>
          </TabsList>
        </div>

        {viewMode === 'cards' ? (
          <>
            <TabsContent value="all" className="mt-4">
              <ReservationsList 
                reservations={reservations}
                filter={filter}
                setFilter={setFilter}
                updateReservationStatus={updateReservationStatus}
                formatDate={formatDate}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <ReservationsList 
                reservations={reservations}
                filter={filter}
                setFilter={setFilter}
                updateReservationStatus={updateReservationStatus}
                formatDate={formatDate}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="confirmed" className="mt-4">
              <ReservationsList 
                reservations={reservations}
                filter={filter}
                setFilter={setFilter}
                updateReservationStatus={updateReservationStatus}
                formatDate={formatDate}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="rejected" className="mt-4">
              <ReservationsList 
                reservations={reservations}
                filter={filter}
                setFilter={setFilter}
                updateReservationStatus={updateReservationStatus}
                formatDate={formatDate}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="completed" className="mt-4">
              <ReservationsList 
                reservations={reservations}
                filter={filter}
                setFilter={setFilter}
                updateReservationStatus={updateReservationStatus}
                formatDate={formatDate}
                isLoading={isLoading}
              />
            </TabsContent>
            <TabsContent value="cancelled" className="mt-4">
              <ReservationsList 
                reservations={reservations}
                filter={filter}
                setFilter={setFilter}
                updateReservationStatus={updateReservationStatus}
                formatDate={formatDate}
                isLoading={isLoading}
              />
            </TabsContent>
          </>
        ) : (
          <TabsContent value={filter} className="mt-4">
            <ReservationsManager
              reservations={reservations}
              updateReservationStatus={updateReservationStatus}
              formatDate={formatDate}
              isLoading={isLoading}
              filter={filter}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
