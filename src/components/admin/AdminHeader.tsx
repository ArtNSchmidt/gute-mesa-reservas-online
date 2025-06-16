
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Calendar, Users, Clock, LogOut } from 'lucide-react';
import { AuthState } from '@/types';

interface AdminHeaderProps {
  authState: AuthState;
  reservationsCount: {
    pending: number;
    confirmed: number;
    total: number;
  };
  onLogout: () => Promise<void>;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ 
  authState, 
  reservationsCount, 
  onLogout 
}) => {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Painel Administrativo
          </h1>
          <p className="text-gray-600 mt-1">
            Bem-vindo, {authState.admin?.name || 'Administrador'}
          </p>
        </div>

        <div className="flex items-center space-x-6">
          {/* Stats Cards */}
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm font-medium text-yellow-900">Pendentes</p>
                <p className="text-lg font-bold text-yellow-600">
                  {reservationsCount.pending}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-green-50 px-3 py-2 rounded-lg">
              <Calendar className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-green-900">Confirmadas</p>
                <p className="text-lg font-bold text-green-600">
                  {reservationsCount.confirmed}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 bg-blue-50 px-3 py-2 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Total</p>
                <p className="text-lg font-bold text-blue-600">
                  {reservationsCount.total}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <Button variant="outline" size="sm" className="relative">
              <Bell className="h-4 w-4" />
              {reservationsCount.pending > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                  {reservationsCount.pending}
                </Badge>
              )}
            </Button>
          </div>

          {/* Logout */}
          <Button onClick={onLogout} variant="outline" size="sm">
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
