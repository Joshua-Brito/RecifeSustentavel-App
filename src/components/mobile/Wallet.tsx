import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { TrendingUp, TrendingDown, Gift, DollarSign, Calendar } from 'lucide-react';
import { Badge } from '../ui/badge';

const transactions = [
  { id: 1, type: 'ganho', description: 'Descarte Reciclável', value: 20, date: '23/10/2025 14:30' },
  { id: 2, type: 'ganho', description: 'Descarte Orgânico', value: 15, date: '23/10/2025 09:15' },
  { id: 3, type: 'resgate', description: 'Vale Cinema', value: -50, date: '22/10/2025 20:00' },
  { id: 4, type: 'ganho', description: 'Descarte Eletrônico', value: 50, date: '22/10/2025 18:45' },
  { id: 5, type: 'ganho', description: 'Bônus de cadastro', value: 50, date: '20/10/2025 10:00' },
  { id: 6, type: 'resgate', description: 'Desconto no transporte', value: -30, date: '19/10/2025 15:30' },
  { id: 7, type: 'ganho', description: 'Descarte Metal', value: 30, date: '19/10/2025 12:00' },
  { id: 8, type: 'ganho', description: 'Descarte Vidro', value: 25, date: '18/10/2025 16:45' },
];

export function Wallet() {
  const balance = 1250;
  const totalEarned = transactions.filter(t => t.type === 'ganho').reduce((sum, t) => sum + t.value, 0);
  const totalRedeemed = Math.abs(transactions.filter(t => t.type === 'resgate').reduce((sum, t) => sum + t.value, 0));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-secondary text-primary-foreground p-6 pb-12 rounded-b-3xl">
        <h2 className="mb-6">Carteira Capivaras</h2>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-6"
        >
          <p className="text-primary-foreground/80 mb-2">Saldo disponível</p>
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-5xl">{balance}</span>
            <span className="text-3xl">🌿</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            className="h-12 bg-white/20 hover:bg-white/30 text-primary-foreground border-0"
          >
            <Gift className="w-4 h-4 mr-2" />
            Resgatar
          </Button>
          <Button
            variant="secondary"
            className="h-12 bg-white/20 hover:bg-white/30 text-primary-foreground border-0"
          >
            <DollarSign className="w-4 h-4 mr-2" />
            Transferir
          </Button>
        </div>
      </div>

      <div className="p-6 -mt-8 space-y-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 gap-3"
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Ganhos</span>
              </div>
              <div className="text-2xl">{totalEarned}</div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                  <TrendingDown className="w-4 h-4 text-accent" />
                </div>
                <span className="text-sm text-muted-foreground">Resgates</span>
              </div>
              <div className="text-2xl">{totalRedeemed}</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Transactions */}
        <div className="space-y-3">
          <h3>Transações</h3>

          {transactions.map((transaction, index) => (
            <motion.div
              key={transaction.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        transaction.type === 'ganho' ? 'bg-primary/10' : 'bg-accent/10'
                      }`}>
                        {transaction.type === 'ganho' ? (
                          <TrendingUp className={`w-5 h-5 ${
                            transaction.type === 'ganho' ? 'text-primary' : 'text-accent'
                          }`} />
                        ) : (
                          <Gift className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <div>
                        <p className="mb-1">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {transaction.date}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`${
                        transaction.value > 0 ? 'text-primary' : 'text-accent'
                      }`}>
                        {transaction.value > 0 ? '+' : ''}{transaction.value} 🌿
                      </div>
                      <Badge variant="outline" className="text-xs mt-1">
                        {transaction.type === 'ganho' ? 'Ganho' : 'Resgate'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
