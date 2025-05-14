
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, ShieldCheck, AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [adminError, setAdminError] = useState<string | null>(null);
  const [emailSent, setEmailSent] = useState(false);
  
  const { login, createAdmin, authState } = useAuth();
  const { toast } = useToast();
  
  // Redefinir erros quando os inputs mudam
  useEffect(() => {
    if (loginError) setLoginError(null);
  }, [email, password]);
  
  useEffect(() => {
    if (adminError) setAdminError(null);
  }, [newAdminEmail]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    setIsLoading(true);
    
    try {
      await login(email, password);
      // O redirecionamento é tratado no AuthContext
    } catch (error: any) {
      console.error('Login failed:', error);
      setLoginError(error.message || 'Falha no login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError(null);
    setIsCreatingAdmin(true);
    setEmailSent(false);
    
    try {
      await createAdmin(newAdminEmail);
      
      setEmailSent(true);
      toast({
        title: "Email de confirmação enviado",
        description: `Um email de confirmação foi enviado para ${newAdminEmail}. Verifique também a pasta de spam.`,
      });
      
      // Não fechamos o diálogo automaticamente para mostrar a mensagem de sucesso
    } catch (error: any) {
      console.error('Failed to create admin:', error);
      setAdminError(error.message || 'Falha ao criar administrador.');
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md shadow-lg border-restaurant-forest-green/20">
          <CardHeader className="space-y-1 bg-restaurant-forest-green text-white rounded-t-lg p-6">
            <CardTitle className="text-2xl font-playfair font-bold flex items-center gap-2">
              <User size={24} />
              Portal Administrativo
            </CardTitle>
            <CardDescription className="text-gray-100">
              Acesse o painel administrativo da Taberna do Gute
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="border-gray-300 focus:border-restaurant-forest-green focus:ring focus:ring-restaurant-forest-green/20"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="border-gray-300 focus:border-restaurant-forest-green focus:ring focus:ring-restaurant-forest-green/20"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-restaurant-light-green hover:bg-restaurant-forest-green transition-colors text-restaurant-dark-wine font-medium py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Entrando...
                  </span>
                ) : 'Entrar'}
              </Button>
            </form>

            {/* Admin initialization */}
            <div className="mt-6 text-center border-t border-gray-200 pt-4">
              <Dialog open={showAdminDialog} onOpenChange={(open) => {
                setShowAdminDialog(open);
                if (!open) {
                  setEmailSent(false);
                  setNewAdminEmail('');
                  setAdminError(null);
                }
              }}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-restaurant-forest-green hover:text-restaurant-dark-wine flex items-center gap-2">
                    <ShieldCheck size={16} />
                    Inicializar Administrador
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Administrador Inicial</DialogTitle>
                    <DialogDescription>
                      Esta opção deve ser usada apenas para criar o administrador inicial do sistema.
                      Um email de confirmação será enviado para o endereço fornecido.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateAdmin} className="space-y-4 py-4">
                    {emailSent ? (
                      <Alert className="bg-green-50 border-green-200 text-green-800">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription>
                          Email de confirmação enviado com sucesso para {newAdminEmail}. 
                          Por favor, verifique sua caixa de entrada e a pasta de spam.
                        </AlertDescription>
                      </Alert>
                    ) : adminError ? (
                      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription>{adminError}</AlertDescription>
                      </Alert>
                    ) : null}
                    
                    <div className="space-y-2">
                      <Label htmlFor="newAdminEmail">Email do Administrador</Label>
                      <Input
                        id="newAdminEmail"
                        type="email"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        placeholder="admin@exemplo.com"
                        required
                        disabled={isCreatingAdmin || emailSent}
                      />
                    </div>
                    
                    <DialogFooter className="flex flex-col sm:flex-row gap-2">
                      {emailSent ? (
                        <>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowAdminDialog(false)}
                            className="w-full"
                          >
                            Fechar
                          </Button>
                          <Button 
                            type="button"
                            onClick={() => {
                              setEmailSent(false);
                              setNewAdminEmail('');
                            }}
                            className="w-full bg-restaurant-forest-green text-white"
                          >
                            Enviar para outro email
                          </Button>
                        </>
                      ) : (
                        <Button 
                          type="submit" 
                          disabled={isCreatingAdmin}
                          className="w-full bg-restaurant-forest-green text-white"
                        >
                          {isCreatingAdmin ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Enviando...
                            </span>
                          ) : 'Enviar Confirmação'}
                        </Button>
                      )}
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
