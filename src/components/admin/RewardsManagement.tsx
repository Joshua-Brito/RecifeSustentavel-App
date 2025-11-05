import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Plus, Edit, Trash2, Search, Gift, Film, Bus, ShoppingBag, Ticket, CreditCard } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { toast } from 'sonner@2.0.3';

const rewards = [
  { id: 1, title: 'Vale Cinema', description: 'Ingresso grátis em salas 2D', value: 50, partner: 'Cinépolis', validity: '31/12/2025', type: 'evento', status: 'ativo', icon: Film },
  { id: 2, title: 'Desconto no Transporte', description: 'R$ 30 de crédito no VEM', value: 30, partner: 'Grande Recife', validity: '31/01/2026', type: 'credito', status: 'ativo', icon: Bus },
  { id: 3, title: 'Vale Shopping', description: 'R$ 50 de desconto', value: 50, partner: 'Shopping Recife', validity: '30/11/2025', type: 'voucher', status: 'ativo', icon: ShoppingBag },
  { id: 4, title: 'Desconto Restaurante', description: '20% de desconto até R$40', value: 40, partner: 'iFood', validity: '31/12/2025', type: 'desconto', status: 'ativo', icon: Ticket },
  { id: 5, title: 'Crédito Biblioteca', description: 'Mensalidade grátis por 1 mês', value: 80, partner: 'Biblioteca Municipal', validity: '31/03/2026', type: 'credito', status: 'ativo', icon: CreditCard },
  { id: 6, title: 'Vale Farmácia', description: 'R$ 25 em produtos', value: 25, partner: 'Farmácia Popular', validity: '31/12/2025', type: 'voucher', status: 'inativo', icon: Gift },
];

export function RewardsManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingReward, setEditingReward] = useState<typeof rewards[0] | null>(null);

  const filteredRewards = rewards.filter((reward) =>
    reward.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    reward.partner.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = () => {
    toast.success('Recompensa adicionada com sucesso!');
    setShowAddDialog(false);
  };

  const handleEdit = (reward: typeof rewards[0]) => {
    setEditingReward(reward);
    setShowAddDialog(true);
  };

  const handleDelete = (reward: typeof rewards[0]) => {
    toast.success(`"${reward.title}" removida com sucesso!`);
  };

  const handleToggleStatus = (reward: typeof rewards[0]) => {
    const newStatus = reward.status === 'ativo' ? 'inativo' : 'ativo';
    toast.success(`Recompensa ${newStatus === 'ativo' ? 'ativada' : 'desativada'}`);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Gerenciamento de Recompensas</h2>
          <p className="text-muted-foreground">{rewards.length} recompensas cadastradas</p>
        </div>
        <Dialog open={showAddDialog} onOpenChange={(open) => {
          setShowAddDialog(open);
          if (!open) setEditingReward(null);
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Nova recompensa
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingReward ? 'Editar' : 'Adicionar'} recompensa</DialogTitle>
              <DialogDescription>
                {editingReward ? 'Edite' : 'Cadastre'} uma recompensa para os usuários
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Título</Label>
                <Input placeholder="Ex: Vale Cinema" defaultValue={editingReward?.title} />
              </div>
              <div className="space-y-2">
                <Label>Descrição</Label>
                <Textarea 
                  placeholder="Descrição detalhada da recompensa" 
                  defaultValue={editingReward?.description}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Valor em Capivaras</Label>
                  <Input type="number" placeholder="50" defaultValue={editingReward?.value} />
                </div>
                <div className="space-y-2">
                  <Label>Tipo</Label>
                  <Select defaultValue={editingReward?.type || 'voucher'}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="voucher">Voucher</SelectItem>
                      <SelectItem value="desconto">Desconto</SelectItem>
                      <SelectItem value="credito">Crédito</SelectItem>
                      <SelectItem value="evento">Evento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Parceiro</Label>
                  <Input placeholder="Nome do parceiro" defaultValue={editingReward?.partner} />
                </div>
                <div className="space-y-2">
                  <Label>Validade</Label>
                  <Input placeholder="31/12/2025" defaultValue={editingReward?.validity} />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => {
                setShowAddDialog(false);
                setEditingReward(null);
              }}>
                Cancelar
              </Button>
              <Button onClick={handleAdd}>
                {editingReward ? 'Salvar' : 'Adicionar'}
              </Button>
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
              placeholder="Buscar por título ou parceiro..."
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
            <div className="text-2xl mb-1">{rewards.filter(r => r.status === 'ativo').length}</div>
            <p className="text-sm text-muted-foreground">Ativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{rewards.filter(r => r.status === 'inativo').length}</div>
            <p className="text-sm text-muted-foreground">Inativas</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{rewards.length}</div>
            <p className="text-sm text-muted-foreground">Total</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{(rewards.reduce((sum, r) => sum + r.value, 0) / rewards.length).toFixed(0)}</div>
            <p className="text-sm text-muted-foreground">Média 🌿</p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Recompensa</TableHead>
                <TableHead>Parceiro</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Validade</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRewards.map((reward, index) => {
                const Icon = reward.icon;
                return (
                  <motion.tr
                    key={reward.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <p>{reward.title}</p>
                          <p className="text-sm text-muted-foreground">{reward.description}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{reward.partner}</TableCell>
                    <TableCell>
                      <Badge className="bg-primary">{reward.value} 🌿</Badge>
                    </TableCell>
                    <TableCell className="capitalize">{reward.type}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{reward.validity}</TableCell>
                    <TableCell>
                      <Badge variant={reward.status === 'ativo' ? 'default' : 'secondary'}>
                        {reward.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleToggleStatus(reward)}
                        >
                          {reward.status === 'ativo' ? 'Desativar' : 'Ativar'}
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEdit(reward)}>
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(reward)}
                        >
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
