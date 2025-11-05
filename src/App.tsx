import { useState } from 'react';
import { Login } from './components/Login';
import { MobileApp } from './components/MobileApp';
import { AdminPanel } from './components/AdminPanel';
import { Toaster } from './components/ui/sonner';

type View = 'login' | 'mobile' | 'admin';

export interface UserData {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

export default function App() {
  const [view, setView] = useState<View>('login');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (user: UserData, admin: boolean = false) => {
    setUserData(user);
    setIsAdmin(admin);
    setView(admin ? 'admin' : 'mobile');
  };

  const handleLogout = () => {
    setUserData(null);
    setIsAdmin(false);
    setView('login');
  };

  return (
    <div className="min-h-screen bg-background">
      {view === 'login' && <Login onLogin={handleLogin} />}
      {view === 'mobile' && userData && <MobileApp userData={userData} onLogout={handleLogout} />}
      {view === 'admin' && <AdminPanel onLogout={handleLogout} />}
      <Toaster />
    </div>
  );
}
