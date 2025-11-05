import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ScanLine, History, Wallet, Map, AlertTriangle, TrendingUp, Trash2, Award } from 'lucide-react';
import { Badge } from '../ui/badge';
import { UserData } from '../../App';

interface HomeProps {
  userData: UserData;
  onNavigate: (screen: string) => void;
}

export function Home({ userData, onNavigate }: HomeProps) {
  const capivarasBalance = 1250;
  const recentDisposals = [
    { id: 1, type: 'Reciclável', capivaras: 20, date: '23/10/2025 14:30', valid: true },
    { id: 2, type: 'Orgânico', capivaras: 15, date: '22/10/2025 09:15', valid: true },
    { id: 3, type: 'Eletrônico', capivaras: 50, date: '21/10/2025 18:45', valid: true },
  ];

  const stats = [
    { label: 'Esta semana', value: '12', icon: Trash2, color: 'text-primary' },
    { label: 'Total de descartes', value: '156', icon: TrendingUp, color: 'text-secondary' },
    { label: 'Nível', value: 'Eco-Herói', icon: Award, color: 'text-accent' },
  ];

  return (
    <div className="min-h-full bg-gradient-to-b from-primary/5 to-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6 pb-8 rounded-b-3xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-1"
        >
          <p className="opacity-90">Bem-vindo de volta, {userData.name.split(' ')[0]}! 👋</p>
          <h1>Recife Sustentável</h1>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="mt-6 bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary-foreground/80 text-sm mb-1">Saldo de Capivaras</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl">{capivarasBalance}</span>
                    <span className="text-xl opacity-80">🌿</span>
                  </div>
                </div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onNavigate('wallet')}
                  className="bg-white/20 hover:bg-white/30 text-primary-foreground border-0"
                >
                  Ver carteira
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="p-6 space-y-6 -mt-4">
        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="grid grid-cols-2 gap-3">
            <Button
              onClick={() => onNavigate('scanner')}
              className="h-24 flex-col gap-2 bg-primary hover:bg-primary/90"
            >
              <ScanLine className="w-6 h-6" />
              <span>Escanear</span>
            </Button>
            <Button
              onClick={() => onNavigate('map')}
              variant="outline"
              className="h-24 flex-col gap-2"
            >
              <Map className="w-6 h-6" />
              <span>Lixeiras</span>
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-3 gap-3"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index}>
                <CardContent className="p-4 text-center">
                  <Icon className={`w-5 h-5 mx-auto mb-2 ${stat.color}`} />
                  <div className="mb-1">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-3"
        >
          <div className="flex items-center justify-between">
            <h3>Descartes recentes</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onNavigate('history')}
            >
              Ver todos
            </Button>
          </div>

          {recentDisposals.map((disposal, index) => (
            <motion.div
              key={disposal.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Trash2 className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p>{disposal.type}</p>
                        <p className="text-sm text-muted-foreground">{disposal.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-primary">+{disposal.capivaras} 🌿</div>
                      <Badge variant="outline" className="text-xs border-primary/20 text-primary">
                        Válido
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Alert if penalties exist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <Card className="border-accent bg-accent/5">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p>Você tem 0 penalidades ativas</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Continue descartando corretamente!
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onNavigate('penalties')}
                >
                  Ver
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
