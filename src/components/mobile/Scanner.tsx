import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { ScanLine, Camera, CheckCircle2, XCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Badge } from '../ui/badge';

interface ScannerProps {
  onNavigate: (screen: string) => void;
}

type ScanState = 'idle' | 'scanning' | 'success' | 'error';

export function Scanner({ onNavigate }: ScannerProps) {
  const [scanState, setScanState] = useState<ScanState>('idle');
  const [scannedData, setScannedData] = useState<{
    type: string;
    capivaras: number;
    weight: number;
  } | null>(null);

  const wasteTypes = [
    { id: 'organico', label: 'Orgânico', color: 'bg-secondary' },
    { id: 'reciclavel', label: 'Reciclável', color: 'bg-primary' },
    { id: 'eletronico', label: 'Eletrônico', color: 'bg-accent' },
    { id: 'metal', label: 'Metal', color: 'bg-chart-4' },
    { id: 'vidro', label: 'Vidro', color: 'bg-chart-5' },
  ];

  const handleScan = () => {
    setScanState('scanning');
    
    // Simulate AI scanning
    setTimeout(() => {
      const randomSuccess = Math.random() > 0.2;
      
      if (randomSuccess) {
        const types = ['Reciclável', 'Orgânico', 'Eletrônico', 'Metal', 'Vidro'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        const capivaras = randomType === 'Eletrônico' ? 50 : randomType === 'Metal' ? 30 : 20;
        
        setScannedData({
          type: randomType,
          capivaras,
          weight: Math.random() * 5 + 0.5,
        });
        setScanState('success');
        
        // Confetti effect
        const duration = 2000;
        const animationEnd = Date.now() + duration;
        const colors = ['#2E8B57', '#8BC34A', '#D9774A'];

        (function frame() {
          const timeLeft = animationEnd - Date.now();

          if (timeLeft <= 0) return;

          const particleCount = 2;
          
          // Create confetti-like elements
          for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '10px';
            particle.style.height = '10px';
            particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            particle.style.left = Math.random() * window.innerWidth + 'px';
            particle.style.top = '-20px';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            document.body.appendChild(particle);

            const fallDuration = 1000 + Math.random() * 1000;
            particle.animate([
              { transform: 'translateY(0px) rotate(0deg)', opacity: 1 },
              { transform: `translateY(${window.innerHeight}px) rotate(720deg)`, opacity: 0 }
            ], {
              duration: fallDuration,
              easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => particle.remove();
          }

          requestAnimationFrame(frame);
        })();

      } else {
        setScanState('error');
      }
    }, 2000);
  };

  const handleReset = () => {
    setScanState('idle');
    setScannedData(null);
  };

  const handleConfirm = () => {
    if (scannedData) {
      toast.success(`Parabéns! +${scannedData.capivaras} Capivaras contabilizadas 🎉`);
      setTimeout(() => {
        onNavigate('home');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-primary/5">
      {/* Header */}
      <div className="bg-card border-b border-border p-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2>Scanner AI</h2>
            <p className="text-sm text-muted-foreground">Escaneie seu resíduo</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Scanner Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-square bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <AnimatePresence mode="wait">
                  {scanState === 'idle' && (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <Camera className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">Posicione o resíduo na câmera</p>
                    </motion.div>
                  )}

                  {scanState === 'scanning' && (
                    <motion.div
                      key="scanning"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      >
                        <ScanLine className="w-16 h-16 text-primary mx-auto mb-4" />
                      </motion.div>
                      <p className="text-primary">Analisando resíduo...</p>
                      <p className="text-sm text-muted-foreground mt-2">IA processando imagem</p>
                    </motion.div>
                  )}

                  {scanState === 'success' && scannedData && (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
                      >
                        <CheckCircle2 className="w-20 h-20 text-primary mx-auto mb-4" />
                      </motion.div>
                      <div className="text-2xl mb-2">+{scannedData.capivaras} 🌿</div>
                      <p className="text-primary">Descarte válido!</p>
                      <Badge className="mt-3 bg-primary">{scannedData.type}</Badge>
                    </motion.div>
                  )}

                  {scanState === 'error' && (
                    <motion.div
                      key="error"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: [0, -10, 10, -10, 10, 0],
                      }}
                      transition={{ x: { duration: 0.5 } }}
                      exit={{ opacity: 0 }}
                      className="text-center"
                    >
                      <XCircle className="w-20 h-20 text-destructive mx-auto mb-4" />
                      <p className="text-destructive">Descarte não reconhecido</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Tente novamente com melhor iluminação
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Scan overlay */}
                {scanState === 'scanning' && (
                  <motion.div
                    className="absolute inset-0 border-4 border-primary/50"
                    animate={{
                      borderColor: ['rgba(46, 139, 87, 0.5)', 'rgba(46, 139, 87, 0)', 'rgba(46, 139, 87, 0.5)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="absolute inset-x-0 h-0.5 bg-primary"
                      animate={{ top: ['0%', '100%'] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                  </motion.div>
                )}
              </div>

              {scannedData && scanState === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 bg-primary/5"
                >
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Peso estimado:</span>
                    <span>{scannedData.weight.toFixed(2)} kg</span>
                  </div>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3"
        >
          {scanState === 'idle' && (
            <Button
              onClick={handleScan}
              className="w-full h-14"
            >
              <ScanLine className="w-5 h-5 mr-2" />
              Iniciar Scanner
            </Button>
          )}

          {scanState === 'success' && (
            <>
              <Button
                onClick={handleConfirm}
                className="w-full h-14"
              >
                <CheckCircle2 className="w-5 h-5 mr-2" />
                Confirmar descarte
              </Button>
              <Button
                onClick={handleReset}
                variant="outline"
                className="w-full"
              >
                Escanear novamente
              </Button>
            </>
          )}

          {scanState === 'error' && (
            <Button
              onClick={handleReset}
              variant="outline"
              className="w-full h-14"
            >
              Tentar novamente
            </Button>
          )}
        </motion.div>

        {/* Info */}
        {scanState === 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="mb-2">Tipos de resíduo reconhecidos:</p>
                    <div className="flex flex-wrap gap-2">
                      {wasteTypes.map((type) => (
                        <Badge key={type.id} variant="outline" className={`${type.color} text-white border-0`}>
                          {type.label}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
