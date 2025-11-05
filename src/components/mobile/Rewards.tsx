import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Gift, Ticket, CreditCard, Calendar, MapPin, ShoppingBag, Film, Bus } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { toast } from 'sonner@2.0.3';

const rewards = [
  {
    id: 1,
    title: 'Vale Cinema',
    description: 'Ingresso grátis em salas 2D',
    value: 50,
    partner: 'Cinépolis',
    validity: '31/12/2025',
    type: 'evento',
    icon: Film,
  },
  {
    id: 2,
    title: 'Desconto no Transporte',
    description: 'R$ 30 de crédito no VEM',
    value: 30,
    partner: 'Grande Recife',
    validity: '31/01/2026',
    type: 'credito',
    icon: Bus,
  },
  {
    id: 3,
    title: 'Vale Shopping',
    description: 'R$ 50 de desconto',
    value: 50,
    partner: 'Shopping Recife',
    validity: '30/11/2025',
    type: 'voucher',
    icon: ShoppingBag,
  },
  {
    id: 4,
    title: 'Desconto Restaurante',
    description: '20% de desconto até R$40',
    value: 40,
    partner: 'iFood',
    validity: '31/12/2025',
    type: 'desconto',
    icon: Ticket,
  },
  {
    id: 5,
    title: 'Crédito Biblioteca',
    description: 'Mensalidade grátis por 1 mês',
    value: 80,
    partner: 'Biblioteca Municipal',
    validity: '31/03/2026',
    type: 'credito',
    icon: CreditCard,
  },
  {
    id: 6,
    title: 'Vale Farmácia',
    description: 'R$ 25 em produtos',
    value: 25,
    partner: 'Farmácia Popular',
    validity: '31/12/2025',
    type: 'voucher',
    icon: Gift,
  },
];

export function Rewards() {
  const [selectedReward, setSelectedReward] = useState<typeof rewards[0] | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const userBalance = 1250;

  const handleRedeem = () => {
    if (selectedReward) {
      toast.success(`${selectedReward.title} resgatado com sucesso! 🎉`);
      setShowDialog(false);
      setSelectedReward(null);
    }
  };

  const openDialog = (reward: typeof rewards[0]) => {
    setSelectedReward(reward);
    setShowDialog(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <h2 className="mb-2">Recompensas</h2>
        <p className="text-primary-foreground/80">Troque suas Capivaras por benefícios</p>
        
        <Card className="mt-4 bg-white/10 border-white/20 backdrop-blur-sm">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-primary-foreground/80">Seu saldo</span>
              <span className="text-2xl">{userBalance} 🌿</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 gap-4">
          {rewards.map((reward, index) => {
            const Icon = reward.icon;
            const canAfford = userBalance >= reward.value;

            return (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={!canAfford ? 'opacity-60' : ''}>
                  <CardContent className="p-5">
                    <div className="flex gap-4">
                      <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <div>
                            <h4 className="mb-1">{reward.title}</h4>
                            <p className="text-sm text-muted-foreground">{reward.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <MapPin className="w-4 h-4" />
                          <span>{reward.partner}</span>
                          <span>•</span>
                          <Calendar className="w-4 h-4" />
                          <span>{reward.validity}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <Badge className="bg-primary">
                            {reward.value} 🌿
                          </Badge>
                          <Button
                            size="sm"
                            onClick={() => openDialog(reward)}
                            disabled={!canAfford}
                          >
                            Resgatar
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Info card */}
        <Card className="border-secondary bg-secondary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Gift className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="mb-1">Continue descartando!</p>
                <p className="text-sm text-muted-foreground">
                  Quanto mais você contribui com o meio ambiente, mais benefícios você ganha.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Redeem Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Resgatar recompensa</DialogTitle>
            <DialogDescription>
              Confirme o resgate de sua recompensa
            </DialogDescription>
          </DialogHeader>

          {selectedReward && (
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    {(() => {
                      const Icon = selectedReward.icon;
                      return <Icon className="w-8 h-8 text-primary" />;
                    })()}
                    <div>
                      <h4>{selectedReward.title}</h4>
                      <p className="text-sm text-muted-foreground">{selectedReward.partner}</p>
                    </div>
                  </div>
                  <p className="text-sm">{selectedReward.description}</p>
                </CardContent>
              </Card>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span>Custo:</span>
                <span className="text-primary">{selectedReward.value} 🌿</span>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <span>Saldo após resgate:</span>
                <span>{userBalance - selectedReward.value} 🌿</span>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={handleRedeem}>
              Confirmar resgate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
