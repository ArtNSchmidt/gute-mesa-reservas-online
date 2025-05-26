
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
    <div className="min-h-screen flex flex-col bg-[var(--brand-background-light)]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-[var(--brand-primary)]/20 rounded-lg">
          <CardHeader className="space-y-1 bg-[var(--brand-background-dark)] text-[var(--brand-text-light)] rounded-t-lg p-6">
            <CardTitle className="text-2xl font-playfair font-bold flex items-center gap-2 text-[var(--brand-text-light)]">
              <ShieldCheck size={24} />
              Inicialização do Administrador
            </CardTitle>
            <CardDescription className="text-[var(--brand-verde-claro)]">
              Configurando acesso administrativo
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-[var(--brand-background-light)] rounded-b-lg">
            <div className="space-y-6">
              {isCreating ? (
                <div className="text-center py-8">
                  <div className="mx-auto w-12 h-12 flex items-center justify-center">
                    <Loader2 className="h-10 w-10 animate-spin text-[var(--brand-primary)]" />
                  </div>
                  <p className="mt-4 text-[var(--brand-text-dark)]">Enviando email de confirmação...</p>
                </div>
              ) : emailSent ? (
                <div className="space-y-4">
                  <Alert className="bg-green-100 border-green-400 text-green-700">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <AlertTitle className="font-semibold">Email enviado com sucesso</AlertTitle>
                    <AlertDescription>
                      Um email de confirmação foi enviado para <span className="font-medium">{adminEmail}</span>. 
                      Verifique sua caixa de entrada e a pasta de spam para completar o registro.
                    </AlertDescription>
                  </Alert>
                  <div className="text-center pt-2">
                    <Button 
                      onClick={() => setIsCreated(true)}
                      className="w-full sm:w-auto bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-[var(--brand-text-light)]"
                    >
                      Ir para página de login
                    </Button>
                  </div>
                </div>
              ) : error ? (
                <div className="space-y-4">
                  <Alert variant="destructive" className="bg-red-100 border-red-400 text-red-700">
                    <AlertTitle className="font-semibold">Erro ao Inicializar</AlertTitle>
                    <AlertDescription>
                      {error}
                    </AlertDescription>
                  </Alert>
                  <Button 
                    onClick={initializeAdmin}
                    className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-[var(--brand-text-light)]"
                  >
                    Tentar Novamente
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  <p className="text-[var(--brand-text-dark)] text-center">
                    Esta página irá criar o administrador inicial do sistema utilizando o email:
                  </p>
                  <p className="font-medium text-center py-3 px-4 bg-[var(--brand-verde-claro)]/20 border border-[var(--brand-verde-claro)] rounded-md text-[var(--brand-text-dark)]">
                    {adminEmail}
                  </p>
                  <p className="text-sm text-[var(--brand-text-dark)]/80 text-center">
                    Um email de confirmação será enviado para este endereço. Verifique sua caixa de entrada e pasta de spam após a criação.
                  </p>
                  <Button 
                    onClick={initializeAdmin}
                    className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-[var(--brand-text-light)] py-3"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Enviando...
                      </span>
                    ) : (
                      'Criar Administrador e Enviar Email'
                    )}
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="bg-[var(--brand-background-dark)]/5 px-6 py-4 text-xs text-[var(--brand-text-dark)]/70 text-center rounded-b-lg border-t border-[var(--brand-primary)]/10">
            Esta página é apenas para configuração inicial do sistema.
          </CardFooter>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default InitializeAdmin;
