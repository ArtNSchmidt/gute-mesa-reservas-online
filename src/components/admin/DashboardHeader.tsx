
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
    <header className="mb-6 md:mb-8 flex flex-col sm:flex-row justify-between sm:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--brand-text-dark)]">Painel Administrativo</h1>
        <p className="text-[var(--brand-text-dark)]/80">
          Bem-vindo, <span className="font-semibold">{authState.admin?.name || 'Administrador'}</span>. Gerencie as reservas do restaurante.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <Button 
          onClick={() => navigate('/admin/create-admin')} 
          variant="outline" 
          className="border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)]/5 hover:text-[var(--brand-secondary)]"
        >
          <UserPlus className="mr-2 h-4 w-4" /> Novo Admin
        </Button>
        <Button 
          onClick={onLogout} 
          variant="outline" 
          className="border-[var(--brand-vinho-escuro)]/80 text-[var(--brand-vinho-escuro)]/90 hover:bg-[var(--brand-vinho-escuro)]/10 hover:text-[var(--brand-vinho-escuro)]"
        >
          <LogOut className="mr-2 h-4 w-4" /> Sair
        </Button>
      </div>
    </header>
  );
};

export default DashboardHeader;
