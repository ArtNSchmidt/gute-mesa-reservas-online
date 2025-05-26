
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
import { useNavigate } from 'react-router-dom';

// Login page component
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
  const navigate = useNavigate();
  
  // Redirect if already authenticated
  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [authState.isAuthenticated, navigate]);
  
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
      // O redirecionamento é tratado pelo useEffect acima
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
    <div className="min-h-screen flex flex-col bg-[var(--brand-background-light)]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md shadow-xl border-[var(--brand-primary)]/20 rounded-lg">
          <CardHeader className="space-y-1 bg-[var(--brand-background-dark)] text-[var(--brand-text-light)] rounded-t-lg p-6">
            <CardTitle className="text-2xl font-playfair font-bold flex items-center gap-2 text-[var(--brand-text-light)]">
              <User size={24} />
              Portal Administrativo
            </CardTitle>
            <CardDescription className="text-[var(--brand-verde-claro)]">
              Acesse o painel administrativo da Taberna do Gute
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-[var(--brand-background-light)] rounded-b-lg">
            <form onSubmit={handleLogin} className="space-y-6">
              {loginError && (
                <Alert variant="destructive" className="bg-red-100 border-red-400 text-red-700"> {/* Slightly adjusted for potentially better contrast if needed */}
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription>{loginError}</AlertDescription>
                </Alert>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[var(--brand-text-dark)]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  className="border-gray-300 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/30"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-[var(--brand-text-dark)]">Senha</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Sua senha"
                  className="border-gray-300 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/30"
                  required
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] transition-colors text-[var(--brand-text-light)] font-medium py-3" // Adjusted padding
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Entrando...
                  </span>
                ) : 'Entrar'}
              </Button>
            </form>

            {/* Admin initialization */}
            <div className="mt-8 text-center border-t border-gray-200 pt-6">
              <Dialog open={showAdminDialog} onOpenChange={(open) => {
                setShowAdminDialog(open);
                if (!open) {
                  setEmailSent(false);
                  setNewAdminEmail('');
                  setAdminError(null);
                }
              }}>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="text-[var(--brand-primary)] border-[var(--brand-primary)] hover:text-[var(--brand-accent)] hover:border-[var(--brand-accent)] flex items-center gap-2"
                  >
                    <ShieldCheck size={16} />
                    Inicializar Administrador
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-[var(--brand-background-light)]">
                  <DialogHeader>
                    <DialogTitle className="text-[var(--brand-text-dark)] font-playfair">Adicionar Administrador Inicial</DialogTitle>
                    <DialogDescription className="text-[var(--brand-text-dark)]/80">
                      Esta opção deve ser usada apenas para criar o administrador inicial do sistema.
                      Um email de confirmação será enviado para o endereço fornecido.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateAdmin} className="space-y-4 py-4">
                    {emailSent ? (
                      <Alert className="bg-green-100 border-green-400 text-green-700">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <AlertDescription>
                          Email de confirmação enviado com sucesso para {newAdminEmail}. 
                          Por favor, verifique sua caixa de entrada e a pasta de spam.
                        </AlertDescription>
                      </Alert>
                    ) : adminError ? (
                      <Alert variant="destructive" className="bg-red-100 border-red-400 text-red-700">
                        <AlertCircle className="h-4 w-4 text-red-600" />
                        <AlertDescription>{adminError}</AlertDescription>
                      </Alert>
                    ) : null}
                    
                    <div className="space-y-2">
                      <Label htmlFor="newAdminEmail" className="text-[var(--brand-text-dark)]">Email do Administrador</Label>
                      <Input
                        id="newAdminEmail"
                        type="email"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        placeholder="admin@exemplo.com"
                        className="border-gray-300 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/30"
                        required
                        disabled={isCreatingAdmin || emailSent}
                      />
                    </div>
                    
                    <DialogFooter className="flex flex-col sm:flex-row gap-2 pt-2">
                      {emailSent ? (
                        <>
                          <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => setShowAdminDialog(false)}
                            className="w-full border-[var(--brand-secondary)] text-[var(--brand-secondary)] hover:border-[var(--brand-primary)] hover:text-[var(--brand-primary)]"
                          >
                            Fechar
                          </Button>
                          <Button 
                            type="button"
                            onClick={() => {
                              setEmailSent(false);
                              setNewAdminEmail('');
                            }}
                            className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-[var(--brand-text-light)]"
                          >
                            Enviar para outro email
                          </Button>
                        </>
                      ) : (
                        <Button 
                          type="submit" 
                          disabled={isCreatingAdmin}
                          className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] text-[var(--brand-text-light)]"
                        >
                          {isCreatingAdmin ? (
                            <span className="flex items-center justify-center gap-2">
                              <Loader2 className="h-5 w-5 animate-spin" />
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
