
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Reservation } from '@/types';

interface ReservationFiltersProps {
  reservations: Reservation[];
  filter: string;
  setFilter: (filter: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const ReservationFilters: React.FC<ReservationFiltersProps> = ({
  reservations,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm
}) => {
  const getStatusCount = (status: string) => {
    if (status === 'all') return reservations.length;
    return reservations.filter(r => r.status === status).length;
  };

  const filterOptions = [
    { value: 'all', label: 'Todas', color: 'bg-gray-100 text-gray-800' },
    { value: 'pending', label: 'Pendentes', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmadas', color: 'bg-green-100 text-green-800' },
    { value: 'completed', label: 'Concluídas', color: 'bg-blue-100 text-blue-800' },
    { value: 'rejected', label: 'Rejeitadas', color: 'bg-red-100 text-red-800' },
    { value: 'cancelled', label: 'Canceladas', color: 'bg-gray-100 text-gray-800' }
  ];

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <Button
              key={option.value}
              variant={filter === option.value ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(option.value)}
              className="relative"
            >
              {option.label}
              <Badge 
                variant="secondary" 
                className={`ml-2 ${option.color}`}
              >
                {getStatusCount(option.value)}
              </Badge>
            </Button>
          ))}
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Buscar por nome, email ou telefone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-80"
            />
          </div>
          
          <Button variant="outline" size="sm">
            <Calendar className="h-4 w-4 mr-2" />
            Filtrar por Data
          </Button>
          
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Mais Filtros
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReservationFilters;
