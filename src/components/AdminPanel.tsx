import { useState } from 'react';
import { Dashboard } from './admin/Dashboard';
import { BinsManagement } from './admin/BinsManagement';
import { UsersManagement } from './admin/UsersManagement';
import { RewardsManagement } from './admin/RewardsManagement';
import { PenaltiesManagement } from './admin/PenaltiesManagement';
import { Reports } from './admin/Reports';
import { Button } from './ui/button';
import { LayoutDashboard, Trash2, Users, Gift, AlertTriangle, BarChart3, LogOut, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  onLogout: () => void;
}

type Screen = 'dashboard' | 'bins' | 'users' | 'rewards' | 'penalties' | 'reports';

export function AdminPanel({ onLogout }: AdminPanelProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const screens = {
    dashboard: <Dashboard />,
    bins: <BinsManagement />,
    users: <UsersManagement />,
    rewards: <RewardsManagement />,
    penalties: <PenaltiesManagement />,
    reports: <Reports />,
  };

  const menuItems = [
    { id: 'dashboard' as Screen, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'bins' as Screen, icon: Trash2, label: 'Lixeiras' },
    { id: 'users' as Screen, icon: Users, label: 'Usuários' },
    { id: 'rewards' as Screen, icon: Gift, label: 'Recompensas' },
    { id: 'penalties' as Screen, icon: AlertTriangle, label: 'Penalidades' },
    { id: 'reports' as Screen, icon: BarChart3, label: 'Relatórios' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="w-64 bg-card border-r border-border flex flex-col"
          >
            {/* Logo */}
            <div className="p-6 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-xl">🌿</span>
                </div>
                <div>
                  <h3 className="text-primary">Admin Panel</h3>
                  <p className="text-xs text-muted-foreground">Recife Sustentável</p>
                </div>
              </div>
            </div>

            {/* Menu */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentScreen === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentScreen(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-border">
              <Button
                variant="outline"
                className="w-full text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={onLogout}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-card border-b border-border p-4 flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
          <h2 className="flex-1">
            {menuItems.find((item) => item.id === currentScreen)?.label}
          </h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Users className="w-4 h-4" />
            <span>Administrador</span>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          {screens[currentScreen]}
        </main>
      </div>
    </div>
  );
}
