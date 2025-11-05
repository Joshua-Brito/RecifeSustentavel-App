import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Label } from './ui/label';
import { Recycle, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { UserData } from '../App';
import { formatCPF, formatPhone } from '../utils/formatters';
import { getUserByEmail, saveUser, emailExists, getUsersCount, getAllUsers, clearAllUsers } from '../utils/userStorage';

interface LoginProps {
  onLogin: (userData: UserData, isAdmin?: boolean) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');

  // Mostra quantos usuários estão cadastrados (apenas para debug)
  useEffect(() => {
    const count = getUsersCount();
    console.log(`💾 Usuários cadastrados: ${count}`);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verifica se o usuário existe no banco de dados local
    const existingUser = getUserByEmail(email);
    
    if (existingUser) {
      // Usuário encontrado! Usa os dados cadastrados
      toast.success(`Bem-vindo de volta, ${existingUser.name.split(' ')[0]}! 👋`);
      onLogin(existingUser);
    } else {
      // Usuário não encontrado - cria um temporário
      const tempUserData: UserData = {
        id: Date.now(),
        name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1).replace(/[._]/g, ' '),
        email: email,
        phone: formatPhone('81999999999'),
        cpf: formatCPF('00000000000'),
      };
      toast.info(`Bem-vindo! Faça seu cadastro completo para salvar seus dados.`);
      onLogin(tempUserData);
    }
  };

  const handleAdminLogin = () => {
    // Mock admin login
    const adminData: UserData = {
      id: 999,
      name: 'Administrador',
      email: 'admin@recife.gov.br',
      phone: formatPhone('81335500000'),
      cpf: formatCPF('00000000000'),
    };
    toast.success('Bem-vindo, administrador!');
    onLogin(adminData, true);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Verifica se o email já está cadastrado
    if (emailExists(email)) {
      toast.error('Este email já está cadastrado! Use a aba "Entrar" para fazer login.');
      return;
    }
    
    // Cria os dados do novo usuário
    const userData: UserData = {
      id: Date.now(), // Generate a unique ID
      name: name,
      email: email,
      phone: phone,
      cpf: cpf,
    };
    
    // Salva no banco de dados local
    const saved = saveUser(userData);
    
    if (saved) {
      toast.success(`Bem-vindo, ${name.split(' ')[0]}! +50 Capivaras de boas-vindas 🎉`);
      console.log(`✅ Novo usuário cadastrado: ${name} (${email})`);
      console.log(`💾 Total de usuários: ${getUsersCount()}`);
      onLogin(userData);
    } else {
      toast.error('Erro ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary mb-4"
          >
            <Recycle className="w-8 h-8 text-primary-foreground" />
          </motion.div>
          <h1 className="text-primary mb-2">Recife Sustentável</h1>
          <p className="text-muted-foreground">Descarte certo, benefícios reais.</p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="register">Cadastrar</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Entre com suas credenciais</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Entrar
                  </Button>
                </form>

                <div className="mt-4 pt-4 border-t">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={handleAdminLogin}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Entrar como Admin
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Cadastro</CardTitle>
                <CardDescription>Crie sua conta e ganhe 50 Capivaras</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input
                      id="name"
                      placeholder="Seu nome"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cpf">CPF</Label>
                    <Input
                      id="cpf"
                      placeholder="000.000.000-00"
                      value={cpf}
                      onChange={(e) => setCpf(formatCPF(e.target.value))}
                      maxLength={14}
                      required
                      className={cpf.length === 14 ? 'border-primary' : ''}
                    />
                    {cpf.length > 0 && cpf.length < 14 && (
                      <p className="text-xs text-muted-foreground">Digite os 11 dígitos do CPF</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      placeholder="(81) 99999-9999"
                      value={phone}
                      onChange={(e) => setPhone(formatPhone(e.target.value))}
                      maxLength={15}
                      required
                      className={phone.length >= 14 ? 'border-primary' : ''}
                    />
                    {phone.length > 0 && phone.length < 14 && (
                      <p className="text-xs text-muted-foreground">Digite o número completo</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="seu@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Senha</Label>
                    <Input
                      id="register-password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Criar conta
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Debug Info - Remove em produção */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 p-4 bg-muted/30 rounded-lg border border-border"
        >
          <p className="text-xs text-muted-foreground text-center mb-2">
            💡 Modo de desenvolvimento
          </p>
          <div className="flex gap-2 justify-center flex-wrap">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const count = getUsersCount();
                const users = getAllUsers();
                console.log('📊 Usuários cadastrados:', users);
                toast.info(`${count} usuário(s) cadastrado(s)`);
              }}
            >
              Ver usuários ({getUsersCount()})
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                clearAllUsers();
                toast.success('Todos os usuários foram removidos');
              }}
            >
              Limpar dados
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
