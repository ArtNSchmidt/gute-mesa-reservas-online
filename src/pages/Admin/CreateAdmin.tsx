
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
      <div className="min-h-screen flex flex-col bg-[var(--brand-background-light)]">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-4 text-[var(--brand-text-dark)]/80">
          <p>Verificando permissões...</p> {/* Consider adding a spinner icon here */}
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[var(--brand-background-light)]">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 md:p-8">
        <Card className="w-full max-w-md shadow-xl border-[var(--brand-primary)]/20 rounded-lg">
          <CardHeader className="space-y-1 bg-[var(--brand-background-dark)] text-[var(--brand-text-light)] rounded-t-lg p-6">
            <CardTitle className="text-2xl font-playfair font-bold flex items-center gap-2 text-[var(--brand-text-light)]">
              <UserPlus size={24} />
              Criar Administrador
            </CardTitle>
            <CardDescription className="text-[var(--brand-verde-claro)]">
              Crie uma conta administrativa para acessar o painel
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 bg-[var(--brand-background-light)] rounded-b-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-[var(--brand-text-dark)]">Nome</Label>
                <Input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nome completo"
                  required
                  className="border-gray-300 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/30"
                  disabled={isLoading}
                />
              </div>
            
              <div className="space-y-2">
                <Label htmlFor="email" className="text-[var(--brand-text-dark)]">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu.email@exemplo.com"
                  required
                  className="border-gray-300 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/30"
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
                  placeholder="Crie uma senha segura"
                  required
                  className="border-gray-300 focus:border-[var(--brand-primary)] focus:ring-[var(--brand-primary)]/30"
                  disabled={isLoading}
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full bg-[var(--brand-primary)] hover:bg-[var(--brand-secondary)] transition-colors text-[var(--brand-text-light)] font-medium py-3"
                disabled={isLoading}
              >
                {isLoading ? 'Criando...' : 'Criar Administrador'}
              </Button>
            </form>
            <div className="mt-6 text-center">
              <Button 
                variant="link" 
                onClick={() => navigate('/admin/dashboard')}
                className="text-[var(--brand-primary)] hover:text-[var(--brand-secondary)]"
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
