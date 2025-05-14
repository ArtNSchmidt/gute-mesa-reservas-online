
-- Criar a função de segurança para verificar se é um administrador
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Habilitar RLS para a tabela de perfis
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Política para permitir inserção de perfis durante criação de usuário
-- Esta política é necessária para que o trigger handle_new_user funcione
CREATE POLICY "Allow trigger to create profiles" ON public.profiles
    FOR INSERT WITH CHECK (true);

-- Política para permitir aos usuários lerem seus próprios perfis
CREATE POLICY "Users can view their own profiles" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

-- Política para permitir aos administradores ver todos os perfis
CREATE POLICY "Admins can view all profiles" ON public.profiles
    FOR SELECT USING (is_admin());

-- Política para permitir aos administradores atualizar qualquer perfil
CREATE POLICY "Admins can update any profile" ON public.profiles
    FOR UPDATE USING (is_admin());

-- Garantir que o trigger para criar perfis automáticos exista
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'name', 'Usuário'),
    COALESCE(new.raw_user_meta_data->>'role', 'customer')
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verificar se o trigger já existe e criar se não existir
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'on_auth_user_created'
  ) THEN
    CREATE TRIGGER on_auth_user_created
      AFTER INSERT ON auth.users
      FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
  END IF;
END
$$;
