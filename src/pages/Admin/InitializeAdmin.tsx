
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Loader2, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { toast } from '@/components/ui/use-toast';

const InitializeAdmin: React.FC = () => {
  const { createAdmin } = useAuth();
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  
  const adminEmail = "arturnogschmidt1@hotmail.com";
  
  const initializeAdmin = async () => {
    setIsCreating(true);
    setError(null);
    
    try {
      console.log("Iniciando criação do administrador inicial...");
      // Cria o admin e envia email de confirmação
      await createAdmin(adminEmail);
      console.log("Administrador criado com sucesso");
      
      setEmailSent(true);
      
      toast({
        title: "Email de confirmação enviado",
        description: "Verifique sua caixa de entrada e pasta de spam para completar a criação do administrador.",
        variant: "default",
      });
    } catch (err: any) {
      console.error("Erro ao criar admin:", err);
      setError(err.message || 'Ocorreu um erro ao criar o administrador');
    } finally {
      setIsCreating(false);
    }
  };

  // Se criado com sucesso, redireciona para login
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
                  <div className="mx-auto w-12 h-12 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-restaurant-forest-green" />
                  </div>
                  <p className="mt-4">Enviando email de confirmação...</p>
                </div>
              ) : emailSent ? (
                <div className="space-y-4">
                  <Alert className="bg-green-50 border-green-200 text-green-800">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle>Email enviado com sucesso</AlertTitle>
                    <AlertDescription>
                      Um email de confirmação foi enviado para {adminEmail}. 
                      Verifique sua caixa de entrada e a pasta de spam para completar o registro.
                    </AlertDescription>
                  </Alert>
                  <div className="text-center">
                    <Button 
                      onClick={() => setIsCreated(true)}
                      className="bg-restaurant-light-green hover:bg-restaurant-forest-green"
                    >
                      Ir para página de login
                    </Button>
                  </div>
                </div>
              ) : error ? (
                <div className="space-y-4">
                  <Alert className="bg-red-50 border-red-200 text-red-800">
                    <AlertTitle>Erro</AlertTitle>
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                  </Alert>
                  <Button 
                    onClick={initializeAdmin}
                    className="w-full bg-restaurant-light-green hover:bg-restaurant-forest-green"
                  >
                    Tentar Novamente
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <p>
                    Esta página irá criar o administrador inicial do sistema utilizando o email:
                  </p>
                  <p className="font-medium text-center py-2 px-4 bg-gray-50 border rounded">
                    {adminEmail}
                  </p>
                  <p className="text-sm text-gray-600">
                    Um email de confirmação será enviado para este endereço. Verifique sua caixa de entrada e pasta de spam após a criação.
                  </p>
                  <Button 
                    onClick={initializeAdmin}
                    className="w-full bg-restaurant-light-green hover:bg-restaurant-forest-green"
                  >
                    Criar Administrador e Enviar Email
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-gray-50 px-6 py-4 text-xs text-gray-500 text-center rounded-b-lg">
            Esta página é apenas para configuração inicial do sistema
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default InitializeAdmin;
