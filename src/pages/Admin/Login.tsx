
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import { Eye, EyeOff, LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const { login, authState } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (authState.isAuthenticated) {
      navigate('/admin/dashboard');
    }
  }, [authState.isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Erro de validação",
        description: "Email e senha são obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(email, password);
      // A navegação é feita dentro da função login em AuthContext
    } catch (error) {
      console.error('Login failed:', error);
      // O toast de erro é exibido dentro da função login em AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md shadow-lg border-restaurant-forest-green/20">
          <CardHeader className="space-y-1 bg-restaurant-forest-green text-white rounded-t-lg p-6">
            <CardTitle className="text-2xl font-playfair font-bold flex items-center gap-2">
              <LogIn size={24} />
              Acesso Administrativo
            </CardTitle>
            <CardDescription className="text-gray-100">
              Entre com suas credenciais para acessar o painel
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  required
                  className="border-gray-300 focus:border-restaurant-forest-green focus:ring focus:ring-restaurant-forest-green/20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10 border-gray-300 focus:border-restaurant-forest-green focus:ring focus:ring-restaurant-forest-green/20"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 hover:text-gray-700"
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-restaurant-light-green hover:bg-restaurant-forest-green transition-colors text-restaurant-dark-wine font-medium py-6"
                disabled={isLoading}
              >
                {isLoading ? 'Carregando...' : 'Entrar'}
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-gray-500">
              <p>Acesso restrito apenas para administradores.</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
