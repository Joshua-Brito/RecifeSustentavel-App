import { useState } from 'react';
import { Home } from './mobile/Home';
import { Scanner } from './mobile/Scanner';
import { History } from './mobile/History';
import { Wallet } from './mobile/Wallet';
import { Rewards } from './mobile/Rewards';
import { Penalties } from './mobile/Penalties';
import { BinMap } from './mobile/BinMap';
import { Profile } from './mobile/Profile';
import { Home as HomeIcon, ScanLine, History as HistoryIcon, Wallet as WalletIcon, Gift, AlertTriangle, Map, User } from 'lucide-react';
import { motion } from 'motion/react';
import { UserData } from '../App';

interface MobileAppProps {
  userData: UserData;
  onLogout: () => void;
}

type Screen = 'home' | 'scanner' | 'history' | 'wallet' | 'rewards' | 'penalties' | 'map' | 'profile';

export function MobileApp({ userData, onLogout }: MobileAppProps) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const screens = {
    home: <Home userData={userData} onNavigate={setCurrentScreen} />,
    scanner: <Scanner onNavigate={setCurrentScreen} />,
    history: <History />,
    wallet: <Wallet />,
    rewards: <Rewards />,
    penalties: <Penalties />,
    map: <BinMap />,
    profile: <Profile userData={userData} onLogout={onLogout} />,
  };

  const navItems = [
    { id: 'home' as Screen, icon: HomeIcon, label: 'Início' },
    { id: 'scanner' as Screen, icon: ScanLine, label: 'Scanner' },
    { id: 'rewards' as Screen, icon: Gift, label: 'Prêmios' },
    { id: 'profile' as Screen, icon: User, label: 'Perfil' },
  ];

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-background">
      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        {screens[currentScreen]}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-card border-t border-border">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id)}
                className="relative flex flex-col items-center justify-center flex-1 h-full"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-x-4 top-0 h-1 bg-primary rounded-full"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'text-primary' : 'text-muted-foreground'}`} />
                <span className={`text-xs ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
