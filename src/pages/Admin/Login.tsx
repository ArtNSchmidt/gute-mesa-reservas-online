
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { User, ShieldCheck } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminDialog, setShowAdminDialog] = useState(false);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  
  const { login, createAdmin } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingAdmin(true);
    
    try {
      await createAdmin(newAdminEmail);
      setShowAdminDialog(false);
      setNewAdminEmail('');
    } catch (error) {
      console.error('Failed to create admin:', error);
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
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-restaurant-light-green hover:bg-restaurant-forest-green transition-colors text-restaurant-dark-wine font-medium py-6"
                disabled={isLoading}
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>
            </form>

            {/* Admin initialization */}
            <div className="mt-6 text-center border-t border-gray-200 pt-4">
              <Dialog open={showAdminDialog} onOpenChange={setShowAdminDialog}>
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
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCreateAdmin} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="newAdminEmail">Email do Administrador</Label>
                      <Input
                        id="newAdminEmail"
                        type="email"
                        value={newAdminEmail}
                        onChange={(e) => setNewAdminEmail(e.target.value)}
                        placeholder="admin@exemplo.com"
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button 
                        type="submit" 
                        disabled={isCreatingAdmin}
                        className="w-full bg-restaurant-forest-green text-white"
                      >
                        {isCreatingAdmin ? 'Adicionando...' : 'Adicionar Administrador'}
                      </Button>
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
