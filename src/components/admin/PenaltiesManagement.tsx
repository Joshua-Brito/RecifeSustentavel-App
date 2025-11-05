import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Plus, Search, AlertTriangle, Ban, XCircle, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';
import { Avatar, AvatarFallback } from '../ui/avatar';

const penalties = [
  { id: 1, user: 'Ana Oliveira', email: 'ana.oliveira@email.com', type: 'suspensao', motivo: 'Múltiplos descartes incorretos', duracao: 7, aplicacao: '15/10/2025', status: 'ativa', diasRestantes: 4 },
  { id: 2, user: 'Fernanda Dias', email: 'fernanda.dias@email.com', type: 'banimento', motivo: 'Reincidência após suspensão', duracao: 0, aplicacao: '10/10/2025', status: 'ativa', diasRestantes: 0 },
  { id: 3, user: 'João Silva', email: 'joao.silva@email.com', type: 'aviso', motivo: 'Descarte incorreto de resíduo orgânico', duracao: 0, aplicacao: '05/10/2025', status: 'expirada', diasRestantes: 0 },
  { id: 4, user: 'Pedro Costa', email: 'pedro.costa@email.com', type: 'aviso', motivo: 'Tentativa de descarte não reconhecível', duracao: 0, aplicacao: '03/10/2025', status: 'expirada', diasRestantes: 0 },
  { id: 5, user: 'Carlos Lima', email: 'carlos.lima@email.com', type: 'suspensao', motivo: 'Descarte incorreto repetido', duracao: 7, aplicacao: '20/10/2025', status: 'ativa', diasRestantes: 2 },
];

const typeConfig: Record<string, { label: string; icon: any; variant: any; color: string }> = {
  aviso: { label: 'Aviso', icon: AlertTriangle, variant: 'outline', color: 'text-accent' },
  suspensao: { label: 'Suspensão', icon: Ban, variant: 'secondary', color: 'text-muted-foreground' },
  banimento: { label: 'Banimento', icon: XCircle, variant: 'destructive', color: 'text-destructive' },
};

export function PenaltiesManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showApplyDialog, setShowApplyDialog] = useState(false);

  const filteredPenalties = penalties.filter((penalty) =>
    penalty.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
    penalty.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleApply = () => {
    toast.success('Penalidade aplicada com sucesso!');
    setShowApplyDialog(false);
  };

  const handleRevoke = (penalty: typeof penalties[0]) => {
    toast.success(`Penalidade de ${penalty.user} revogada`);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Gerenciamento de Penalidades</h2>
          <p className="text-muted-foreground">{penalties.length} penalidades registradas</p>
        </div>
        <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
          <DialogTrigger asChild>
            <Button variant="outline" className="text-destructive border-destructive">
              <Plus className="w-4 h-4 mr-2" />
              Aplicar penalidade
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aplicar penalidade</DialogTitle>
              <DialogDescription>Aplique uma penalidade a um usuário</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Usuário</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um usuário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">João Silva</SelectItem>
                    <SelectItem value="2">Maria Santos</SelectItem>
                    <SelectItem value="3">Pedro Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Tipo de penalidade</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aviso">Aviso</SelectItem>
                    <SelectItem value="suspensao">Suspensão</SelectItem>
                    <SelectItem value="banimento">Banimento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Duração (dias)</Label>
                <Input type="number" placeholder="7" />
                <p className="text-sm text-muted-foreground">Deixe em branco para avisos e banimentos</p>
              </div>
              <div className="space-y-2">
                <Label>Motivo</Label>
                <Textarea 
                  placeholder="Descreva o motivo da penalidade"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowApplyDialog(false)}>Cancelar</Button>
              <Button variant="destructive" onClick={handleApply}>Aplicar</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por usuário..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{penalties.filter(p => p.status === 'ativa').length}</div>
            <p className="text-sm text-muted-foreground">Ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{penalties.filter(p => p.type === 'aviso').length}</div>
            <p className="text-sm text-muted-foreground">Avisos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{penalties.filter(p => p.type === 'suspensao' && p.status === 'ativa').length}</div>
            <p className="text-sm text-muted-foreground">Suspensões</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{penalties.filter(p => p.type === 'banimento').length}</div>
            <p className="text-sm text-muted-foreground">Banimentos</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Usuário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Motivo</TableHead>
                <TableHead>Duração</TableHead>
                <TableHead>Aplicação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPenalties.map((penalty, index) => {
                const typeInfo = typeConfig[penalty.type];
                const TypeIcon = typeInfo.icon;

                return (
                  <motion.tr
                    key={penalty.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarFallback>
                            {penalty.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{penalty.user}</p>
                          <p className="text-sm text-muted-foreground">{penalty.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={typeInfo.variant as any} className="gap-1">
                        <TypeIcon className="w-3 h-3" />
                        {typeInfo.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <p className="max-w-xs truncate">{penalty.motivo}</p>
                    </TableCell>
                    <TableCell>
                      {penalty.duracao > 0 ? (
                        <span>
                          {penalty.diasRestantes} / {penalty.duracao} dias
                        </span>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">{penalty.aplicacao}</TableCell>
                    <TableCell>
                      <Badge variant={penalty.status === 'ativa' ? 'default' : 'outline'}>
                        {penalty.status === 'ativa' ? 'Ativa' : 'Expirada'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        {penalty.status === 'ativa' && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => handleRevoke(penalty)}
                          >
                            Revogar
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </motion.tr>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="border-accent bg-accent/5">
        <CardContent className="p-6">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-accent flex-shrink-0" />
            <div>
              <h4 className="mb-2">Sistema de penalidades</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>1º descarte incorreto:</strong> Aviso automático</li>
                <li>• <strong>2º descarte incorreto:</strong> Suspensão de 7 dias</li>
                <li>• <strong>3º descarte incorreto:</strong> Suspensão de 30 dias</li>
                <li>• <strong>Reincidência:</strong> Banimento permanente</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
