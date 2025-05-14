
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { UserPlus } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const CreateAdmin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { authState } = useAuth();

  // Verificar se o usuário está autenticado e é um administrador
  useEffect(() => {
    // Se ainda estiver carregando a autenticação, aguarde
    if (authState.isLoading) return;
    
    // Se não estiver autenticado OU não for admin, redirecione para login
    if (!authState.isAuthenticated || !authState.admin) {
      toast({
        title: "Acesso negado",
        description: "Apenas administradores podem criar novos administradores.",
        variant: "destructive"
      });
      navigate('/admin/login');
    }
  }, [authState.isAuthenticated, authState.isLoading, authState.admin, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast({
        title: "Erro de validação",
        description: "Todos os campos são obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 1. Criar o usuário com auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error("Falha ao criar usuário");
      }
      
      // 2. Atualizar o perfil do usuário para administrador
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ 
          name, 
          role: 'admin' 
        })
        .eq('id', authData.user.id);
      
      if (profileError) throw profileError;
      
      toast({
        title: "Administrador criado com sucesso",
        description: "O novo administrador pode fazer login com as credenciais criadas.",
      });
      
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Erro ao criar admin:', error);
      
      toast({
        variant: "destructive",
        title: "Erro ao criar admin",
        description: error.message || "Não foi possível criar o administrador.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Se estiver carregando a autenticação, mostra um indicador de carregamento
  if (authState.isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4">
          <p>Verificando permissões...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-white to-gray-100">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md shadow-lg border-restaurant-forest-green/20">
          <CardHeader className="space-y-1 bg-restaurant-forest-green text-white rounded-t-lg p-6">
            <CardTitle className="text-2xl font-playfair font-bold flex items-center gap-2">
              <UserPlus size={24} />
              Criar Administrador
            </CardTitle>
            <CardDescription className="text-gray-100">
              Crie uma conta administrativa para acessar o painel
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                  required
                  className="border-gray-300 focus:border-restaurant-forest-green focus:ring focus:ring-restaurant-forest-green/20"
                />
              </div>
            
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
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Crie uma senha segura"
                  required
                  className="border-gray-300 focus:border-restaurant-forest-green focus:ring focus:ring-restaurant-forest-green/20"
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-restaurant-light-green hover:bg-restaurant-forest-green transition-colors text-restaurant-dark-wine font-medium py-6"
                disabled={isLoading}
              >
                {isLoading ? 'Criando...' : 'Criar Administrador'}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={() => navigate('/admin/dashboard')}
                className="text-restaurant-forest-green hover:text-restaurant-dark-wine"
              >
                Voltar para o painel
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default CreateAdmin;
