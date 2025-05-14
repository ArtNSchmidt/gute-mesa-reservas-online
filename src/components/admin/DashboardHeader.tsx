
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, UserPlus } from 'lucide-react';
import { AuthState } from '@/types';

interface DashboardHeaderProps {
  authState: AuthState;
  onLogout: () => Promise<void>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ authState, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="mb-8 flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold mb-2">Painel Administrativo</h1>
        <p className="text-gray-600">
          Bem-vindo, {authState.admin?.name || 'Administrador'}. Gerencie as reservas do restaurante.
        </p>
      </div>
      <div className="flex space-x-4">
        <Button 
          onClick={() => navigate('/admin/create-admin')} 
          variant="outline" 
          className="border-restaurant-forest-green text-restaurant-forest-green hover:bg-restaurant-forest-green/10"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Novo Admin
        </Button>
        <Button 
          onClick={onLogout} 
          variant="outline" 
          className="border-restaurant-dark-wine text-restaurant-dark-wine hover:bg-restaurant-dark-wine/10"
        >
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
