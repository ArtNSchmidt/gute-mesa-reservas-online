
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserPlus, Download, Settings, BarChart3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const QuickActions: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Ações Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-20 flex flex-col space-y-2"
            onClick={() => navigate('/admin/create-admin')}
          >
            <UserPlus className="h-6 w-6" />
            <span className="text-sm">Novo Admin</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex flex-col space-y-2"
          >
            <Download className="h-6 w-6" />
            <span className="text-sm">Exportar</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex flex-col space-y-2"
          >
            <BarChart3 className="h-6 w-6" />
            <span className="text-sm">Relatórios</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="h-20 flex flex-col space-y-2"
          >
            <Settings className="h-6 w-6" />
            <span className="text-sm">Configurações</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default QuickActions;
