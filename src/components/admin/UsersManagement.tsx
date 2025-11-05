import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { Search, Users as UsersIcon, Award, Ban, Edit, Eye } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

const users = [
  { id: 1, name: 'João Silva', email: 'joao.silva@email.com', capivaras: 1250, descartes: 156, nivel: 'Eco-Herói', status: 'ativo', cadastro: '10/2024' },
  { id: 2, name: 'Maria Santos', email: 'maria.santos@email.com', capivaras: 890, descartes: 98, nivel: 'Guardião Verde', status: 'ativo', cadastro: '09/2024' },
  { id: 3, name: 'Pedro Costa', email: 'pedro.costa@email.com', capivaras: 2340, descartes: 245, nivel: 'Eco-Herói', status: 'ativo', cadastro: '08/2024' },
  { id: 4, name: 'Ana Oliveira', email: 'ana.oliveira@email.com', capivaras: 450, descartes: 45, nivel: 'Iniciante', status: 'suspenso', cadastro: '10/2024' },
  { id: 5, name: 'Carlos Lima', email: 'carlos.lima@email.com', capivaras: 1780, descartes: 189, nivel: 'Eco-Herói', status: 'ativo', cadastro: '07/2024' },
  { id: 6, name: 'Juliana Rocha', email: 'juliana.rocha@email.com', capivaras: 650, descartes: 72, nivel: 'Guardião Verde', status: 'ativo', cadastro: '09/2024' },
  { id: 7, name: 'Roberto Alves', email: 'roberto.alves@email.com', capivaras: 120, descartes: 12, nivel: 'Iniciante', status: 'ativo', cadastro: '10/2024' },
  { id: 8, name: 'Fernanda Dias', email: 'fernanda.dias@email.com', capivaras: 0, descartes: 3, nivel: 'Iniciante', status: 'banido', cadastro: '10/2024' },
];

export function UsersManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'ativo': return 'default';
      case 'suspenso': return 'outline';
      case 'banido': return 'destructive';
      default: return 'secondary';
    }
  };

  const openDetails = (user: typeof users[0]) => {
    setSelectedUser(user);
    setShowDetailsDialog(true);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div>
        <h2>Gerenciamento de Usuários</h2>
        <p className="text-muted-foreground">{users.length} usuários cadastrados</p>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome ou email..."
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
            <div className="text-2xl mb-1">{users.filter(u => u.status === 'ativo').length}</div>
            <p className="text-sm text-muted-foreground">Ativos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{users.filter(u => u.status === 'suspenso').length}</div>
            <p className="text-sm text-muted-foreground">Suspensos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{users.filter(u => u.status === 'banido').length}</div>
            <p className="text-sm text-muted-foreground">Banidos</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl mb-1">{users.reduce((sum, u) => sum + u.capivaras, 0).toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Total Capivaras</p>
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
                <TableHead>Capivaras</TableHead>
                <TableHead>Descartes</TableHead>
                <TableHead>Nível</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Cadastro</TableHead>
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p>{user.name}</p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span>{user.capivaras}</span>
                      <span>🌿</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.descartes}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="gap-1">
                      <Award className="w-3 h-3" />
                      {user.nivel}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(user.status) as any}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{user.cadastro}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="sm" onClick={() => openDetails(user)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        <Ban className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </motion.tr>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Detalhes do usuário</DialogTitle>
            <DialogDescription>Informações completas do usuário</DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="w-16 h-16">
                  <AvatarFallback className="text-xl">
                    {selectedUser.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3>{selectedUser.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedUser.email}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl mb-1">{selectedUser.capivaras} 🌿</div>
                    <p className="text-sm text-muted-foreground">Capivaras</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl mb-1">{selectedUser.descartes}</div>
                    <p className="text-sm text-muted-foreground">Descartes</p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Nível:</span>
                  <Badge variant="outline">{selectedUser.nivel}</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant={getStatusVariant(selectedUser.status) as any}>
                    {selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Membro desde:</span>
                  <span>{selectedUser.cadastro}</span>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDetailsDialog(false)}>Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
