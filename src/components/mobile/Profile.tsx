import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { User, Mail, Phone, CreditCard, Award, Settings, LogOut, ChevronRight, Bell, Shield, HelpCircle } from 'lucide-react';
import { Badge } from '../ui/badge';
import { UserData } from '../../App';

interface ProfileProps {
  userData: UserData;
  onLogout: () => void;
}

export function Profile({ userData, onLogout }: ProfileProps) {
  const user = {
    name: userData.name,
    email: userData.email,
    phone: userData.phone,
    cpf: userData.cpf,
    level: 'Eco-Herói',
    totalDisposals: 156,
    memberSince: '11/2025',
  };

  const menuItems = [
    { icon: User, label: 'Dados pessoais', action: () => {} },
    { icon: Bell, label: 'Notificações', action: () => {} },
    { icon: Shield, label: 'Privacidade e segurança', action: () => {} },
    { icon: HelpCircle, label: 'Ajuda e suporte', action: () => {} },
    { icon: Settings, label: 'Configurações', action: () => {} },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground p-6 pb-12 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <Avatar className="w-24 h-24 mx-auto mb-4 border-4 border-white/20">
            <AvatarFallback className="bg-white/20 text-primary-foreground text-2xl">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <h2 className="mb-2">{user.name}</h2>
          <Badge className="bg-white/20 text-primary-foreground border-0 mb-2">
            {user.level}
          </Badge>
          <p className="text-sm text-primary-foreground/80">
            Membro desde {user.memberSince}
          </p>
        </motion.div>
      </div>

      <div className="p-6 -mt-8 space-y-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                <Award className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl mb-1">{user.totalDisposals}</div>
              <p className="text-sm text-muted-foreground">Descartes</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-2">
                <span className="text-2xl">🌿</span>
              </div>
              <div className="text-2xl mb-1">1.250</div>
              <p className="text-sm text-muted-foreground">Capivaras</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <h3>Informações</h3>
          
          <Card>
            <CardContent className="p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p>{user.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">Telefone</p>
                  <p>{user.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <CreditCard className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">CPF</p>
                  <p>{user.cpf}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Menu */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="cursor-pointer hover:bg-muted/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5 text-muted-foreground" />
                      <span>{item.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Button
            variant="outline"
            className="w-full h-12 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5 mr-2" />
            Sair da conta
          </Button>
        </motion.div>

        {/* App Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center text-sm text-muted-foreground pt-4"
        >
          <p>Recife Sustentável v1.0.0</p>
          <p>Conecta Recife © 2025</p>
        </motion.div>
      </div>
    </div>
  );
}
