import { useState } from 'react';
import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Download, Calendar, TrendingUp, Users, Trash2, Gift, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'sonner@2.0.3';

const disposalsOverTime = [
  { month: 'Jun', descartes: 3200, validos: 2880, invalidos: 320 },
  { month: 'Jul', descartes: 3800, validos: 3420, invalidos: 380 },
  { month: 'Ago', descartes: 4200, validos: 3780, invalidos: 420 },
  { month: 'Set', descartes: 4800, validos: 4320, invalidos: 480 },
  { month: 'Out', descartes: 5400, validos: 4860, invalidos: 540 },
];

const capivarasFlow = [
  { month: 'Jun', distribuidas: 45000, resgatadas: 28000 },
  { month: 'Jul', distribuidas: 52000, resgatadas: 32000 },
  { month: 'Ago', distribuidas: 58000, resgatadas: 38000 },
  { month: 'Set', distribuidas: 65000, resgatadas: 42000 },
  { month: 'Out', distribuidas: 72000, resgatadas: 48000 },
];

const userGrowth = [
  { month: 'Jun', usuarios: 5200 },
  { month: 'Jul', usuarios: 6100 },
  { month: 'Ago', usuarios: 7300 },
  { month: 'Set', usuarios: 7900 },
  { month: 'Out', usuarios: 8562 },
];

const topUsers = [
  { name: 'Pedro Costa', descartes: 245, capivaras: 2340 },
  { name: 'Carlos Lima', descartes: 189, capivaras: 1780 },
  { name: 'João Silva', descartes: 156, capivaras: 1250 },
  { name: 'Maria Santos', descartes: 98, capivaras: 890 },
  { name: 'Juliana Rocha', descartes: 72, capivaras: 650 },
];

const topLocations = [
  { location: 'Praça do Derby', descartes: 1234 },
  { location: 'Parque da Jaqueira', descartes: 987 },
  { location: 'Shopping Recife', descartes: 856 },
  { location: 'Boa Viagem', descartes: 745 },
  { location: 'Casa Forte', descartes: 623 },
];

export function Reports() {
  const [period, setPeriod] = useState('monthly');

  const handleExport = (reportType: string) => {
    toast.success(`Relatório de ${reportType} exportado com sucesso!`);
  };

  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2>Relatórios e Analytics</h2>
          <p className="text-muted-foreground">Análise detalhada do sistema</p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="weekly">Semanal</SelectItem>
              <SelectItem value="monthly">Mensal</SelectItem>
              <SelectItem value="yearly">Anual</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Período personalizado
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-primary" />
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <TrendingUp className="w-4 h-4" />
                +15%
              </div>
            </div>
            <div className="text-2xl mb-1">5.4k</div>
            <p className="text-sm text-muted-foreground">Descartes este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <TrendingUp className="w-4 h-4" />
                +8%
              </div>
            </div>
            <div className="text-2xl mb-1">8.6k</div>
            <p className="text-sm text-muted-foreground">Usuários ativos</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                <Gift className="w-5 h-5 text-accent" />
              </div>
              <div className="flex items-center gap-1 text-sm text-primary">
                <TrendingUp className="w-4 h-4" />
                +12%
              </div>
            </div>
            <div className="text-2xl mb-1">72k</div>
            <p className="text-sm text-muted-foreground">Capivaras distribuídas</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-destructive" />
              </div>
              <div className="flex items-center gap-1 text-sm text-destructive">
                <TrendingUp className="w-4 h-4" />
                -5%
              </div>
            </div>
            <div className="text-2xl mb-1">540</div>
            <p className="text-sm text-muted-foreground">Descartes inválidos</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Descartes ao longo do tempo</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleExport('descartes')}>
                <Download className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={disposalsOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="validos" stackId="1" stroke="#2E8B57" fill="#2E8B57" fillOpacity={0.8} name="Válidos" />
                  <Area type="monotone" dataKey="invalidos" stackId="1" stroke="#EF4444" fill="#EF4444" fillOpacity={0.8} name="Inválidos" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Fluxo de Capivaras</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleExport('capivaras')}>
                <Download className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={capivarasFlow}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="distribuidas" stroke="#2E8B57" strokeWidth={2} name="Distribuídas" />
                  <Line type="monotone" dataKey="resgatadas" stroke="#D9774A" strokeWidth={2} name="Resgatadas" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Crescimento de usuários</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => handleExport('usuarios')}>
                <Download className="w-4 h-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={userGrowth}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="usuarios" fill="#8BC34A" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Top 5 usuários</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="mb-1">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.descartes} descartes</p>
                    </div>
                    <div className="text-right">
                      <div className="text-primary">{user.capivaras} 🌿</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Locais mais ativos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topLocations.map((loc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm">{index + 1}</span>
                      </div>
                      <span>{loc.location}</span>
                    </div>
                    <div className="text-primary">{loc.descartes}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
