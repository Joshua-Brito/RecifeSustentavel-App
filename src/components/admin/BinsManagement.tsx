import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { MapPin, Search, Filter, Plus, Edit, Trash2, CheckCircle, AlertCircle, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

const bins = [
  { id: 1, location: 'Praça do Derby', type: 'reciclavel', status: 'ativa', capacity: 75, lat: -8.0522, lng: -34.8956, lastValidation: '23/10/2025 14:30' },
  { id: 2, location: 'Parque da Jaqueira', type: 'organico', status: 'ativa', capacity: 45, lat: -8.0389, lng: -34.8989, lastValidation: '23/10/2025 12:15' },
  { id: 3, location: 'Shopping Recife', type: 'eletronico', status: 'ativa', capacity: 30, lat: -8.1194, lng: -34.9050, lastValidation: '23/10/2025 10:00' },
  { id: 4, location: 'Boa Viagem', type: 'reciclavel', status: 'cheia', capacity: 95, lat: -8.1277, lng: -34.8948, lastValidation: '23/10/2025 08:30' },
  { id: 5, location: 'Casa Forte', type: 'metal', status: 'ativa', capacity: 60, lat: -8.0265, lng: -34.9264, lastValidation: '23/10/2025 09:45' },
  { id: 6, location: 'Pina', type: 'vidro', status: 'offline', capacity: 0, lat: -8.0889, lng: -34.8756, lastValidation: '22/10/2025 16:20' },
  { id: 7, location: 'Torre', type: 'reciclavel', status: 'manutencao', capacity: 0, lat: -8.0489, lng: -34.8776, lastValidation: '21/10/2025 14:00' },
];

const statusConfig: Record<string, { label: string; icon: any; variant: any; color: string }> = {
  ativa: { label: 'Ativa', icon: CheckCircle, variant: 'default', color: 'text-primary' },
  offline: { label: 'Offline', icon: AlertCircle, variant: 'secondary', color: 'text-muted-foreground' },
  cheia: { label: 'Cheia', icon: AlertCircle, variant: 'destructive', color: 'text-destructive' },
  manutencao: { label: 'Manutenção', icon: Activity, variant: 'outline', color: 'text-accent' },
};

const typeLabels: Record<string, string> = {
  organico: 'Orgânico',
  reciclavel: 'Reciclável',
  eletronico: 'Eletrônico',
  metal: 'Metal',
  vidro: 'Vidro',
};

export function BinsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddDialog, setShowAddDialog] = useState(false);

  const filteredBins = bins.filter((bin) => {
    const matchesSearch = bin.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bin.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddBin = () => {
    toast.success('Lixeira adicionada com sucesso!');
    setShowAddDialog(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Gerenciamento de Lixeiras</h2>
          <p className="text-muted-foreground">{bins.length} lixeiras cadastradas</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova lixeira
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Adicionar nova lixeira</DialogTitle>
              <DialogDescription>Cadastre uma nova lixeira inteligente no sistema</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Localização</Label>
                <Input placeholder="Ex: Praça do Derby" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Latitude</Label>
                  <Input placeholder="-8.0522" />
                </div>
                <div className="space-y-2">
                  <Label>Longitude</Label>
                  <Input placeholder="-34.8956" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tipo de resíduo</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="organico">Orgânico</SelectItem>
                    <SelectItem value="reciclavel">Reciclável</SelectItem>
                    <SelectItem value="eletronico">Eletrônico</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="vidro">Vidro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Capacidade máxima (litros)</Label>
                <Input type="number" placeholder="100" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAddDialog(false)}>Cancelar</Button>
              <Button onClick={handleAddBin}>Adicionar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por localização..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ativa">Ativa</SelectItem>
                <SelectItem value="offline">Offline</SelectItem>
                <SelectItem value="cheia">Cheia</SelectItem>
                <SelectItem value="manutencao">Manutenção</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{bins.filter(b => b.status === 'ativa').length}</div>
            <p className="text-sm text-muted-foreground">Ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{bins.filter(b => b.status === 'cheia').length}</div>
            <p className="text-sm text-muted-foreground">Cheias</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{bins.filter(b => b.status === 'offline').length}</div>
            <p className="text-sm text-muted-foreground">Offline</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{bins.filter(b => b.status === 'manutencao').length}</div>
            <p className="text-sm text-muted-foreground">Manutenção</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Localização</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Capacidade</TableHead>
                <TableHead>Última validação</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBins.map((bin, index) => {
                const statusInfo = statusConfig[bin.status];
                const StatusIcon = statusInfo.icon;

                return (
                  <motion.tr
                    key={bin.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{bin.location}</span>
                      </div>
                    </TableCell>
                    <TableCell>{typeLabels[bin.type]}</TableCell>
                    <TableCell>
                      <Badge variant={statusInfo.variant as any} className="gap-1">
                        <StatusIcon className="w-3 h-3" />
                        {statusInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {bin.status === 'ativa' || bin.status === 'cheia' ? `${bin.capacity}%` : '—'}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{bin.lastValidation}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
