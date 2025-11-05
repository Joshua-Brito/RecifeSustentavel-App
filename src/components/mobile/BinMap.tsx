import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { MapPin, Navigation, Trash2, Activity, AlertCircle, CheckCircle, Filter } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

const bins = [
  { 
    id: 1, 
    location: 'Praça do Derby', 
    type: 'reciclavel', 
    status: 'ativa', 
    capacity: 75,
    distance: '0.3 km',
    latitude: -8.0522,
    longitude: -34.8956,
  },
  { 
    id: 2, 
    location: 'Parque da Jaqueira', 
    type: 'organico', 
    status: 'ativa', 
    capacity: 45,
    distance: '0.8 km',
    latitude: -8.0389,
    longitude: -34.8989,
  },
  { 
    id: 3, 
    location: 'Shopping Recife', 
    type: 'eletronico', 
    status: 'ativa', 
    capacity: 30,
    distance: '1.2 km',
    latitude: -8.1194,
    longitude: -34.9050,
  },
  { 
    id: 4, 
    location: 'Boa Viagem', 
    type: 'reciclavel', 
    status: 'cheia', 
    capacity: 95,
    distance: '2.5 km',
    latitude: -8.1277,
    longitude: -34.8948,
  },
  { 
    id: 5, 
    location: 'Casa Forte', 
    type: 'metal', 
    status: 'ativa', 
    capacity: 60,
    distance: '1.5 km',
    latitude: -8.0265,
    longitude: -34.9264,
  },
  { 
    id: 6, 
    location: 'Pina', 
    type: 'vidro', 
    status: 'offline', 
    capacity: 0,
    distance: '3.2 km',
    latitude: -8.0889,
    longitude: -34.8756,
  },
];

const typeLabels: Record<string, { label: string; color: string }> = {
  organico: { label: 'Orgânico', color: 'bg-secondary' },
  reciclavel: { label: 'Reciclável', color: 'bg-primary' },
  eletronico: { label: 'Eletrônico', color: 'bg-accent' },
  metal: { label: 'Metal', color: 'bg-chart-4' },
  vidro: { label: 'Vidro', color: 'bg-chart-5' },
};

const statusLabels: Record<string, { label: string; icon: any; color: string }> = {
  ativa: { label: 'Ativa', icon: CheckCircle, color: 'text-primary' },
  offline: { label: 'Offline', icon: AlertCircle, color: 'text-muted-foreground' },
  cheia: { label: 'Cheia', icon: AlertCircle, color: 'text-destructive' },
  manutencao: { label: 'Manutenção', icon: Activity, color: 'text-accent' },
};

export function BinMap() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedBin, setSelectedBin] = useState<typeof bins[0] | null>(null);

  const filteredBins = bins.filter(bin => 
    selectedType === 'all' || bin.type === selectedType
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground p-6">
        <h2 className="mb-2">Mapa de Lixeiras</h2>
        <p className="text-primary-foreground/80">Encontre lixeiras inteligentes próximas</p>
      </div>

      <div className="p-6 space-y-4">
        {/* Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-muted-foreground" />
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="flex-1">
                  <SelectValue placeholder="Tipo de resíduo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="organico">Orgânico</SelectItem>
                  <SelectItem value="reciclavel">Reciclável</SelectItem>
                  <SelectItem value="eletronico">Eletrônico</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="vidro">Vidro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] bg-gradient-to-br from-muted via-background to-muted flex items-center justify-center">
                {/* Mock map with markers */}
                <div className="absolute inset-0 p-8">
                  {filteredBins.map((bin, index) => {
                    const StatusIcon = statusLabels[bin.status].icon;
                    const isActive = bin.status === 'ativa';
                    
                    return (
                      <motion.div
                        key={bin.id}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="absolute cursor-pointer"
                        style={{
                          left: `${20 + (index % 3) * 30}%`,
                          top: `${20 + Math.floor(index / 3) * 30}%`,
                        }}
                        onClick={() => setSelectedBin(bin)}
                      >
                        <div className={`relative ${isActive ? 'animate-pulse' : ''}`}>
                          <MapPin 
                            className={`w-8 h-8 ${
                              isActive ? 'text-primary' : 'text-muted-foreground'
                            } drop-shadow-lg`}
                            fill={isActive ? 'currentColor' : 'none'}
                          />
                          <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-background">
                            <StatusIcon className={`w-3 h-3 ${statusLabels[bin.status].color}`} />
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Legend */}
                <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                  <p className="text-xs mb-2">Legenda</p>
                  <div className="flex gap-3 text-xs">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                      <span>Ativa</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-destructive" />
                      <span>Cheia</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                      <span>Offline</span>
                    </div>
                  </div>
                </div>

                {/* Current location button */}
                <Button
                  size="sm"
                  className="absolute top-4 right-4 shadow-lg"
                >
                  <Navigation className="w-4 h-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Bins List */}
        <div className="space-y-3">
          <h3>Lixeiras próximas ({filteredBins.length})</h3>

          {filteredBins.map((bin, index) => {
            const typeInfo = typeLabels[bin.type];
            const statusInfo = statusLabels[bin.status];
            const StatusIcon = statusInfo.icon;
            
            return (
              <motion.div
                key={bin.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card 
                  className={`cursor-pointer transition-colors ${
                    selectedBin?.id === bin.id ? 'border-primary' : ''
                  }`}
                  onClick={() => setSelectedBin(bin)}
                >
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-xl ${typeInfo.color} flex items-center justify-center flex-shrink-0`}>
                        <Trash2 className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="mb-1">{bin.location}</p>
                            <Badge variant="outline" className={`${typeInfo.color} text-white border-0`}>
                              {typeInfo.label}
                            </Badge>
                          </div>
                          <span className="text-sm text-muted-foreground">{bin.distance}</span>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <StatusIcon className={`w-4 h-4 ${statusInfo.color}`} />
                            <span className={`text-sm ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>
                          {bin.status === 'ativa' && (
                            <div className="text-sm text-muted-foreground">
                              Capacidade: {bin.capacity}%
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
