import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Trash2, CheckCircle, XCircle, Calendar, Filter } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

const disposals = [
  { id: 1, type: 'Reciclável', capivaras: 20, date: '23/10/2025 14:30', valid: true, weight: 1.2, location: 'Praça do Derby' },
  { id: 2, type: 'Orgânico', capivaras: 15, date: '23/10/2025 09:15', valid: true, weight: 0.8, location: 'Parque da Jaqueira' },
  { id: 3, type: 'Eletrônico', capivaras: 50, date: '22/10/2025 18:45', valid: true, weight: 2.5, location: 'Shopping Recife' },
  { id: 4, type: 'Reciclável', capivaras: 0, date: '22/10/2025 11:20', valid: false, weight: 0, location: 'Boa Viagem' },
  { id: 5, type: 'Metal', capivaras: 30, date: '21/10/2025 16:00', valid: true, weight: 3.1, location: 'Casa Forte' },
  { id: 6, type: 'Vidro', capivaras: 25, date: '21/10/2025 10:30', valid: true, weight: 1.7, location: 'Pina' },
  { id: 7, type: 'Orgânico', capivaras: 15, date: '20/10/2025 08:45', valid: true, weight: 0.9, location: 'Parque da Jaqueira' },
  { id: 8, type: 'Reciclável', capivaras: 20, date: '19/10/2025 14:15', valid: true, weight: 1.5, location: 'Praça do Derby' },
];

export function History() {
  const [filter, setFilter] = useState<'all' | 'valid' | 'invalid'>('all');

  const filteredDisposals = disposals.filter((d) => {
    if (filter === 'valid') return d.valid;
    if (filter === 'invalid') return !d.valid;
    return true;
  });

  const totalCapivaras = disposals.filter(d => d.valid).reduce((sum, d) => sum + d.capivaras, 0);
  const totalWeight = disposals.filter(d => d.valid).reduce((sum, d) => sum + d.weight, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <h2 className="mb-4">Histórico de Descartes</h2>
        
        <div className="grid grid-cols-2 gap-3">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{totalCapivaras}</div>
              <p className="text-sm text-primary-foreground/80">Capivaras ganhas</p>
            </CardContent>
          </Card>
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-4 text-center">
              <div className="text-2xl mb-1">{totalWeight.toFixed(1)}kg</div>
              <p className="text-sm text-primary-foreground/80">Peso total</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="p-6 space-y-4">
        {/* Filters */}
        <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="valid">Válidos</TabsTrigger>
            <TabsTrigger value="invalid">Inválidos</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* List */}
        <div className="space-y-3">
          {filteredDisposals.map((disposal, index) => (
            <motion.div
              key={disposal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card>
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      disposal.valid ? 'bg-primary/10' : 'bg-destructive/10'
                    }`}>
                      {disposal.valid ? (
                        <CheckCircle className="w-6 h-6 text-primary" />
                      ) : (
                        <XCircle className="w-6 h-6 text-destructive" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <p className="mb-1">{disposal.type}</p>
                          <p className="text-sm text-muted-foreground">{disposal.location}</p>
                        </div>
                        {disposal.valid ? (
                          <Badge className="bg-primary shrink-0">
                            +{disposal.capivaras} 🌿
                          </Badge>
                        ) : (
                          <Badge variant="destructive" className="shrink-0">
                            Inválido
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{disposal.date}</span>
                        </div>
                        {disposal.valid && (
                          <span>{disposal.weight}kg</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredDisposals.length === 0 && (
          <Card>
            <CardContent className="p-8 text-center">
              <Trash2 className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
              <p className="text-muted-foreground">Nenhum descarte encontrado</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
