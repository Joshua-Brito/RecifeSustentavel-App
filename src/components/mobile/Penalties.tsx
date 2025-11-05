import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { AlertTriangle, CheckCircle, Clock, Ban, XCircle } from 'lucide-react';
import { Progress } from '../ui/progress';

const penalties = [
  {
    id: 1,
    type: 'aviso',
    motivo: 'Descarte incorreto de resíduo orgânico em lixeira de recicláveis',
    duracao_dias: 0,
    data_aplicacao: '15/10/2025',
    status: 'expirada',
    dias_restantes: 0,
  },
  {
    id: 2,
    type: 'aviso',
    motivo: 'Tentativa de descarte de resíduo não reconhecível',
    duracao_dias: 0,
    data_aplicacao: '10/10/2025',
    status: 'expirada',
    dias_restantes: 0,
  },
];

const activePenalties = penalties.filter(p => p.status === 'ativa');
const expiredPenalties = penalties.filter(p => p.status === 'expirada');

export function Penalties() {
  const hasActivePenalties = activePenalties.length > 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className={`p-6 ${
        hasActivePenalties 
          ? 'bg-destructive text-destructive-foreground' 
          : 'bg-primary text-primary-foreground'
      }`}>
        <h2 className="mb-2">Penalidades</h2>
        <p className={hasActivePenalties ? 'text-destructive-foreground/80' : 'text-primary-foreground/80'}>
          {hasActivePenalties 
            ? 'Você possui penalidades ativas' 
            : 'Nenhuma penalidade ativa'}
        </p>
      </div>

      <div className="p-6 space-y-6">
        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className={hasActivePenalties ? 'border-destructive bg-destructive/5' : 'border-primary bg-primary/5'}>
            <CardContent className="p-6 text-center">
              {hasActivePenalties ? (
                <>
                  <AlertTriangle className="w-16 h-16 text-destructive mx-auto mb-4" />
                  <h3 className="text-destructive mb-2">Status: Penalizado</h3>
                  <p className="text-sm text-muted-foreground">
                    Você possui restrições ativas em sua conta
                  </p>
                </>
              ) : (
                <>
                  <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                  <h3 className="text-primary mb-2">Status: Regular</h3>
                  <p className="text-sm text-muted-foreground">
                    Continue descartando corretamente!
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Active Penalties */}
        {activePenalties.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-destructive">Penalidades ativas</h3>
            {activePenalties.map((penalty, index) => (
              <motion.div
                key={penalty.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="border-destructive">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center flex-shrink-0">
                        {penalty.type === 'aviso' && <AlertTriangle className="w-6 h-6 text-destructive" />}
                        {penalty.type === 'suspensao' && <Ban className="w-6 h-6 text-destructive" />}
                        {penalty.type === 'banimento' && <XCircle className="w-6 h-6 text-destructive" />}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="destructive">
                            {penalty.type === 'aviso' && 'Aviso'}
                            {penalty.type === 'suspensao' && 'Suspensão'}
                            {penalty.type === 'banimento' && 'Banimento'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {penalty.data_aplicacao}
                          </span>
                        </div>

                        <p className="mb-3">{penalty.motivo}</p>

                        {penalty.duracao_dias > 0 && (
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-muted-foreground">Tempo restante</span>
                              <span className="text-destructive">
                                {penalty.dias_restantes} de {penalty.duracao_dias} dias
                              </span>
                            </div>
                            <Progress 
                              value={(penalty.dias_restantes / penalty.duracao_dias) * 100} 
                              className="h-2"
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Expired Penalties */}
        {expiredPenalties.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-muted-foreground">Histórico</h3>
            {expiredPenalties.map((penalty, index) => (
              <motion.div
                key={penalty.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="opacity-60">
                  <CardContent className="p-4">
                    <div className="flex gap-3">
                      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-muted-foreground" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">
                            {penalty.type === 'aviso' && 'Aviso'}
                            {penalty.type === 'suspensao' && 'Suspensão'}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {penalty.data_aplicacao}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            Expirado
                          </Badge>
                        </div>

                        <p className="text-sm text-muted-foreground">{penalty.motivo}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Info */}
        <Card className="border-secondary bg-secondary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
              <div>
                <p className="mb-2">Sistema de penalidades</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 1º descarte incorreto: Aviso</li>
                  <li>• 2º descarte incorreto: Suspensão de 7 dias</li>
                  <li>• 3º descarte incorreto: Suspensão de 30 dias</li>
                  <li>• Reincidência: Banimento permanente</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
