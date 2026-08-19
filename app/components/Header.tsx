import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { 
  Layers, 
  Package, 
  ShoppingCart, 
  BarChart3, 
  Truck, 
  Sparkles, 
  Bell, 
  CheckCheck, 
  Clock, 
  X,
  Sun,
  Moon
} from 'lucide-react';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  isRead: boolean;
  type: 'order' | 'stock' | 'supplier';
}

interface HeaderProps {
  activeOrderCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ activeOrderCount = 0 }) => {
  const location = useLocation();

  //KARANLIK / AÇIK MOD STATE
  const [isDarkMode, setIsNotificationDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsNotificationDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsNotificationDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsNotificationDarkMode(true);
    }
  };

  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: '1',
      title: 'Sipariş Güncellendi',
      description: 'PER-1043 personeli SIP-1001 numaralı siparişi güncelledi.',
      time: '5 dk önce',
      isRead: false,
      type: 'order',
    },
    {
      id: '2',
      title: 'Kritik Stok Uyarısı',
      description: 'Essence Mascara ürününün stoğu 10 adedin altına düştü.',
      time: '18 dk önce',
      isRead: false,
      type: 'stock',
    },
    {
      id: '3',
      title: 'Yeni Tedarikçi Siparişi',
      description: 'Atlas Lojistik A.Ş. için 250 adet Kulaklık talebi oluşturuldu.',
      time: '1 saat önce',
      isRead: true,
      type: 'supplier',
    },
  ]);

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isRead: true })));
  };

  const markAsRead = (id: string) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n)));
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-slate-900 border-b border-slate-800 text-white sticky top-0 z-40 backdrop-blur-md bg-slate-900/95 shadow-lg mb-8">
      {/* Üst Logo, Durum Barı, Tema Butonu ve Bildirim Kutusu */}
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-3 flex items-center justify-between border-b border-slate-800/60">
        <Link to="/" className="flex items-center gap-3">
          <div className="p-2.5 bg-gradient-to-tr from-indigo-600 to-violet-500 rounded-xl shadow-lg shadow-indigo-500/20">
            <Layers className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-slate-100">Stok & Envanter Paneli</h1>
              <span className="text-[10px] font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2 py-0.5 rounded-full flex items-center gap-1">
                <Sparkles className="w-3 h-3" /> v2.0
              </span>
            </div>
            <p className="text-xs text-slate-400">Canlı Stok Takip ve Yönetim Sistemi</p>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          {/*TEMA DEĞİŞTİRME BUTONU (DARK / LIGHT MODE)*/}
          <button
            onClick={toggleTheme}
            className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-slate-300 transition-colors"
            title={isDarkMode ? 'Açık Moda Geç' : 'Karanlık Moda Geç'}
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400 animate-spin-slow" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-300" />
            )}
          </button>

          {/* CANLI BİLDİRİM MERKEZİ BUTONU */}
          <div className="relative">
            <button
              onClick={() => setIsNotificationOpen(!isNotificationOpen)}
              className="p-2.5 bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60 rounded-xl text-slate-300 transition-colors relative"
              title="Bildirimler"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* BİLDİRİM AÇILIR PENCERESİ */}
            {isNotificationOpen && (
              <div className="absolute right-0 mt-3 w-80 sm:w-96 bg-white text-slate-800 rounded-2xl shadow-2xl border border-slate-200 z-50 overflow-hidden">
                <div className="p-4 bg-slate-900 text-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4 text-indigo-400" />
                    <h3 className="font-bold text-sm">Bildirim Merkezi</h3>
                    {unreadCount > 0 && (
                      <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-full font-bold">
                        {unreadCount} Yeni
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllAsRead}
                        className="text-[11px] text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-semibold"
                      >
                        <CheckCheck className="w-3.5 h-3.5" /> Tümünü Oku
                      </button>
                    )}
                    <button
                      onClick={() => setIsNotificationOpen(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-slate-100">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-400">
                      Henüz bildirim bulunmuyor.
                    </div>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        onClick={() => markAsRead(n.id)}
                        className={`p-3.5 text-xs transition-colors cursor-pointer flex items-start gap-3 ${
                          !n.isRead ? 'bg-indigo-50/40 hover:bg-indigo-50/70' : 'hover:bg-slate-50'
                        }`}
                      >
                        <div
                          className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${
                            !n.isRead ? 'bg-indigo-600' : 'bg-slate-300'
                          }`}
                        />
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-slate-900">{n.title}</span>
                            <span className="text-[10px] text-slate-400 flex items-center gap-0.5">
                              <Clock className="w-2.5 h-2.5" /> {n.time}
                            </span>
                          </div>
                          <p className="text-slate-600 leading-relaxed text-[11px]">{n.description}</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-slate-800/80 border border-slate-700/60 px-3 py-1.5 rounded-xl text-xs font-medium text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Sistem Aktif
          </div>
        </div>
      </div>

      {/* Navigasyon / Menü Barı */}
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex items-center gap-1 overflow-x-auto py-2 text-xs font-medium text-slate-400 no-scrollbar">
          <Link
            to="/"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              isActive('/')
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                : 'hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Package className="w-4 h-4" />
            Stok Yönetimi
          </Link>

          <Link
            to="/orders"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              isActive('/orders')
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                : 'hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <ShoppingCart className="w-4 h-4" />
            Sipariş Takibi
            {activeOrderCount > 0 && (
              <span className="bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                {activeOrderCount} Aktif
              </span>
            )}
          </Link>

          <Link
            to="/suppliers"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              isActive('/suppliers')
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                : 'hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <Truck className="w-4 h-4" />
            Tedarikçiler
          </Link>

          <Link
            to="/reports"
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all whitespace-nowrap ${
              isActive('/reports')
                ? 'bg-indigo-600 text-white font-semibold shadow-md shadow-indigo-600/20'
                : 'hover:bg-slate-800 hover:text-slate-200'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Raporlar & Analiz
          </Link>
        </nav>
      </div>
    </header>
  );
};