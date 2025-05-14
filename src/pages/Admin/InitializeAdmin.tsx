
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const InitializeAdmin: React.FC = () => {
  const { createAdmin } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const adminEmail = "arturnogschmidt1@hotmail.com";
  
  const initializeAdmin = async () => {
    setIsCreating(true);
    setError(null);
    
    try {
      // Senha aleatória que será mostrada ao usuário
      const password = Math.random().toString(36).slice(-10);
      await createAdmin(adminEmail, password);
      setIsCreated(true);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao criar o administrador');
    } finally {
      setIsCreating(false);
    }
  };

  useEffect(() => {
    // Inicializar automaticamente ao carregar a página
    initializeAdmin();
  }, []);

  if (isCreated) {
    return <Navigate to="/admin/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1 bg-restaurant-forest-green text-white rounded-t-lg">
            <CardTitle className="text-2xl font-playfair font-bold flex items-center gap-2">
              <ShieldCheck size={24} />
              Inicialização do Administrador
            </CardTitle>
            <CardDescription className="text-gray-100">
              Configurando acesso administrativo
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {isCreating ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-restaurant-forest-green mx-auto"></div>
                  <p className="mt-4">Criando administrador...</p>
                </div>
              ) : error ? (
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 border border-red-200 rounded-md text-red-600">
                    {error}
                  </div>
                  <Button 
                    onClick={initializeAdmin}
                    className="w-full bg-restaurant-light-green hover:bg-restaurant-forest-green"
                  >
                    Tentar Novamente
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p>Redirecionando para a página de login...</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default InitializeAdmin;
