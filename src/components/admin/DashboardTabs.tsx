
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
      <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 sm:mb-6 gap-3">
        <h2 className="text-xl md:text-2xl font-semibold text-[var(--brand-text-dark)]">Reservas</h2>
        <div className="flex space-x-2">
          <Button 
            variant={viewMode === 'cards' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('cards')}
            className={`
              ${viewMode === 'cards' 
                ? 'bg-[var(--brand-primary)] text-[var(--brand-text-light)] hover:bg-[var(--brand-secondary)]' 
                : 'border-[var(--brand-primary)]/50 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/5 hover:text-[var(--brand-secondary)]'}
            `}
          >
            Cartões
          </Button>
          <Button 
            variant={viewMode === 'table' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('table')}
            className={`
              ${viewMode === 'table' 
                ? 'bg-[var(--brand-primary)] text-[var(--brand-text-light)] hover:bg-[var(--brand-secondary)]' 
                : 'border-[var(--brand-primary)]/50 text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/5 hover:text-[var(--brand-secondary)]'}
            `}
          >
            Tabela
          </Button>
        </div>
      </div>
      <Tabs defaultValue="all" onValueChange={(value) => setFilter(value as any)}>
        <div className="overflow-x-auto pb-2 border-b border-[var(--brand-primary)]/10">
          <TabsList className="bg-transparent p-0">
            <TabsTrigger 
              value="all" 
              className="data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--brand-text-light)] data-[state=inactive]:text-[var(--brand-text-dark)]/70 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] data-[state=active]:shadow-sm rounded-t-md px-3 py-2 text-sm font-medium"
            >
              Todas
            </TabsTrigger>
            <TabsTrigger 
              value="pending"
              className="data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--brand-text-light)] data-[state=inactive]:text-[var(--brand-text-dark)]/70 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] data-[state=active]:shadow-sm rounded-t-md px-3 py-2 text-sm font-medium"
            >
              Pendentes
            </TabsTrigger>
            <TabsTrigger 
              value="confirmed"
              className="data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--brand-text-light)] data-[state=inactive]:text-[var(--brand-text-dark)]/70 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] data-[state=active]:shadow-sm rounded-t-md px-3 py-2 text-sm font-medium"
            >
              Confirmadas
            </TabsTrigger>
            <TabsTrigger 
              value="rejected"
              className="data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--brand-text-light)] data-[state=inactive]:text-[var(--brand-text-dark)]/70 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] data-[state=active]:shadow-sm rounded-t-md px-3 py-2 text-sm font-medium"
            >
              Rejeitadas
            </TabsTrigger>
            <TabsTrigger 
              value="completed"
              className="data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--brand-text-light)] data-[state=inactive]:text-[var(--brand-text-dark)]/70 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] data-[state=active]:shadow-sm rounded-t-md px-3 py-2 text-sm font-medium"
            >
              Concluídas
            </TabsTrigger>
            <TabsTrigger 
              value="cancelled"
              className="data-[state=active]:bg-[var(--brand-primary)] data-[state=active]:text-[var(--brand-text-light)] data-[state=inactive]:text-[var(--brand-text-dark)]/70 hover:bg-[var(--brand-primary)]/10 hover:text-[var(--brand-primary)] data-[state=active]:shadow-sm rounded-t-md px-3 py-2 text-sm font-medium"
            >
              Canceladas
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Ensure TabsContent background is clean, using page bg or transparent */}
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
