import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { TrendingUp, TrendingDown, Users, Trash2, Gift, AlertTriangle, Activity } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const stats = [
  { 
    label: 'Descartes Hoje', 
    value: '1,234', 
    change: '+12%', 
    trend: 'up',
    icon: Trash2,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  { 
    label: 'Usuários Ativos', 
    value: '8,562', 
    change: '+5%', 
    trend: 'up',
    icon: Users,
    color: 'text-secondary',
    bgColor: 'bg-secondary/10',
  },
  { 
    label: 'Capivaras Distribuídas', 
    value: '45.2k', 
    change: '+18%', 
    trend: 'up',
    icon: Activity,
    color: 'text-accent',
    bgColor: 'bg-accent/10',
  },
  { 
    label: 'Penalidades Ativas', 
    value: '23', 
    change: '-8%', 
    trend: 'down',
    icon: AlertTriangle,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
];

const disposalsData = [
  { day: 'Seg', descartes: 850 },
  { day: 'Ter', descartes: 920 },
  { day: 'Qua', descartes: 1100 },
  { day: 'Qui', descartes: 980 },
  { day: 'Sex', descartes: 1234 },
  { day: 'Sáb', descartes: 760 },
  { day: 'Dom', descartes: 680 },
];

const wasteTypeData = [
  { name: 'Reciclável', value: 40, color: '#2E8B57' },
  { name: 'Orgânico', value: 30, color: '#8BC34A' },
  { name: 'Eletrônico', value: 15, color: '#D9774A' },
  { name: 'Metal', value: 10, color: '#60A5FA' },
  { name: 'Vidro', value: 5, color: '#F59E0B' },
];

const recentActivity = [
  { id: 1, user: 'João Silva', action: 'Descarte válido', type: 'Reciclável', capivaras: 20, time: '2 min atrás' },
  { id: 2, user: 'Maria Santos', action: 'Resgate de recompensa', type: 'Vale Cinema', capivaras: -50, time: '5 min atrás' },
  { id: 3, user: 'Pedro Costa', action: 'Descarte válido', type: 'Orgânico', capivaras: 15, time: '8 min atrás' },
  { id: 4, user: 'Ana Oliveira', action: 'Descarte inválido', type: 'Não reconhecido', capivaras: 0, time: '12 min atrás' },
  { id: 5, user: 'Carlos Lima', action: 'Descarte válido', type: 'Eletrônico', capivaras: 50, time: '15 min atrás' },
];

export function Dashboard() {
  return (
    <div className="p-6 space-y-6 max-w-[1400px]">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-lg ${stat.bgColor} flex items-center justify-center`}>
                      <Icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      stat.trend === 'up' ? 'text-primary' : 'text-destructive'
                    }`}>
                      <TrendIcon className="w-4 h-4" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                  <div className="text-3xl mb-1">{stat.value}</div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Disposals Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card>
            <CardHeader>
              <CardTitle>Descartes da Semana</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={disposalsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '0.5rem',
                    }}
                  />
                  <Bar dataKey="descartes" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Waste Type Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Tipos de Resíduo</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={wasteTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {wasteTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {wasteTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                      <span>{item.name}</span>
                    </div>
                    <span className="text-muted-foreground">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Atividade Recente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p>{activity.user}</p>
                      <p className="text-sm text-muted-foreground">{activity.action} • {activity.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={activity.capivaras >= 0 ? 'text-primary' : 'text-accent'}>
                      {activity.capivaras > 0 ? '+' : ''}{activity.capivaras !== 0 ? `${activity.capivaras} 🌿` : '—'}
                    </div>
                    <p className="text-sm text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
