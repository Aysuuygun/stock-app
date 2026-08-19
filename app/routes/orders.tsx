import { useState } from 'react';
import { Header } from '../components/Header';
import { 
  ShoppingCart, 
  Clock, 
  Truck, 
  CheckCircle2, 
  AlertCircle, 
  Edit2, 
  X, 
  User, 
  Calendar, 
  Banknote, 
  Tag,
  PlusCircle,
  BadgeCheck,
  UserCheck,
  History,
  RotateCcw
} from 'lucide-react';

export interface Order {
  id: string;
  customer: string;
  total: string;
  status: 'Hazırlanıyor' | 'Kargoda' | 'Tamamlandı' | 'İptal Edildi';
  date: string;
  isUpdated?: boolean;
  updatedBy?: string;
  updatedAt?: string;
}

// Varsayılan / İlk API Verileri
const INITIAL_ORDERS: Order[] = [
  { 
    id: 'SIP-1001', 
    customer: 'Ahmet Yılmaz', 
    total: '₺4.250', 
    status: 'Hazırlanıyor', 
    date: '2026-08-12',
    isUpdated: true,
    updatedBy: 'PER-1043',
    updatedAt: '12.08.2026 22:14'
  },
  { id: 'SIP-1002', customer: 'Ayşe Kaya', total: '₺1.890', status: 'Kargoda', date: '2026-08-12' },
  { id: 'SIP-1003', customer: 'Mehmet Demir', total: '₺12.400', status: 'Tamamlandı', date: '2026-08-11' },
];

// Para biriminden sadece sayıları çıkaran yardımcı fonksiyon
const parseAmount = (value: string): number => {
  const cleaned = value.replace(/[^0-9]/g, '');
  return cleaned ? Number(cleaned) : 0;
};

// Sayıyı '₺4.250' formatına getiren yardımcı fonksiyon
const formatCurrency = (amount: number): string => {
  return `₺${amount.toLocaleString('tr-TR')}`;
};

// Tarih Doğrulama Fonksiyonu 
const isValidDate = (dateString: string): boolean => {
  if (!dateString) return false;
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return false;
  const year = d.getFullYear();
  return year >= 1960 && year <= 2099;
};

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // CANLI SAYICI: 'Hazırlanıyor' veya 'Kargoda' durumundaki aktif siparişler
  const activeOrdersCount = orders.filter(
    (o) => o.status === 'Hazırlanıyor' || o.status === 'Kargoda'
  ).length;

  // API'den Yenile (Sıfırla) İşlemi
  const handleResetOrders = () => {
    const isConfirmed = window.confirm("Sipariş verilerini sıfırlayıp ilk API verilerine dönmek istediğinize emin misiniz?");
    
    if (isConfirmed) {
      setOrders(INITIAL_ORDERS);
      setTimeout(() => {
        window.alert("Sipariş verileri başarıyla sıfırlandı!");
      }, 100);
    }
  };

  // Yeni Sipariş Ekleme İşlemi
  const handleAddOrder = (newOrder: Omit<Order, 'id'>, staffId: string) => {
    const generatedId = `SIP-${1000 + orders.length + 1}`;
    const orderToAdd: Order = {
      ...newOrder,
      id: generatedId,
      updatedBy: staffId || 'PER-100',
    };

    setOrders([orderToAdd, ...orders]);
    setIsAddModalOpen(false);

    setTimeout(() => {
      window.alert(`${generatedId} numaralı yeni sipariş sisteme eklendi!`);
    }, 100);
  };

  // Varolan Siparişi Güncelleme İşlemi
  const handleSaveOrder = (updatedOrder: Order, staffId: string) => {
    const isConfirmed = window.confirm(`${updatedOrder.id} numaralı siparişi güncellemek istediğinize emin misiniz?`);

    if (isConfirmed) {
      const now = new Date();
      const timeString = `${now.toLocaleDateString('tr-TR')} ${now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;

      const finalOrder: Order = {
        ...updatedOrder,
        isUpdated: true,
        updatedBy: staffId || 'PER-100',
        updatedAt: timeString,
      };

      setOrders(orders.map((o) => (o.id === updatedOrder.id ? finalOrder : o)));
      setEditingOrder(null);

      setTimeout(() => {
        window.alert(`${updatedOrder.id} numaralı sipariş ${staffId} personeli tarafından güncellendi!`);
      }, 100);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'Hazırlanıyor':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Clock className="w-3.5 h-3.5 text-indigo-500" /> Hazırlanıyor
          </span>
        );
      case 'Kargoda':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Truck className="w-3.5 h-3.5 text-amber-500" /> Kargoda
          </span>
        );
      case 'Tamamlandı':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Tamamlandı
          </span>
        );
      case 'İptal Edildi':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200">
            <AlertCircle className="w-3.5 h-3.5 text-rose-500" /> İptal Edildi
          </span>
        );
    }
  };

  return (
  <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-12 transition-colors duration-300">
      <Header activeOrderCount={activeOrdersCount} />

      <div className="max-w-6xl mx-auto px-4 space-y-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <ShoppingCart className="w-6 h-6 text-indigo-600" /> Sipariş Takip & Ekip Paneli
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">Sipariş değişikliklerini ve personel geçmişini canlı takip edin</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetOrders}
                className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
                title="Siparişleri İlk Haliyle Yenile"
              >
                <RotateCcw className="w-3.5 h-3.5" /> API'den Yenile (Sıfırla)
              </button>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
              >
                <PlusCircle className="w-4 h-4" /> Yeni Sipariş Girişi
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500 bg-slate-50/50">
                  <th className="py-3.5 px-4">Sipariş No</th>
                  <th className="py-3.5 px-4">Müşteri</th>
                  <th className="py-3.5 px-4">Sipariş Tarihi</th>
                  <th className="py-3.5 px-4">Tutar</th>
                  <th className="py-3.5 px-4">Durum</th>
                  <th className="py-3.5 px-4">Son İşlem Yapan</th>
                  <th className="py-3.5 px-4 text-right">İşlem</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm">
                {orders.map((order) => (
                  <tr 
                    key={order.id} 
                    className={`hover:bg-slate-50/80 transition-colors ${order.isUpdated ? 'bg-amber-50/20' : ''}`}
                  >
                    <td className="py-3.5 px-4 font-bold text-slate-900">
                      <div className="flex items-center gap-2">
                        {order.id}
                        {order.isUpdated && (
                          <span className="text-[10px] font-extrabold bg-amber-500/15 text-amber-700 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3 text-amber-600" /> GÜNCELLENDİ
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3.5 px-4 text-slate-700 font-medium">{order.customer}</td>
                    <td className="py-3.5 px-4 text-slate-500 text-xs">{order.date}</td>
                    <td className="py-3.5 px-4 font-extrabold text-slate-900">{order.total}</td>
                    <td className="py-3.5 px-4">{getStatusBadge(order.status)}</td>
                    <td className="py-3.5 px-4">
                      {order.updatedBy ? (
                        <div className="text-xs">
                          <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-flex items-center gap-1">
                            <UserCheck className="w-3 h-3 text-indigo-600" /> {order.updatedBy}
                          </span>
                          {order.updatedAt && (
                            <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                              <History className="w-2.5 h-2.5" /> {order.updatedAt}
                            </p>
                          )}
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400">-</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setEditingOrder(order)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 rounded-lg transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Düzenle
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Sipariş Ekleme Modalı */}
      {isAddModalOpen && (
        <AddOrderModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddOrder}
        />
      )}

      {/* Sipariş Düzenleme Modalı */}
      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={handleSaveOrder}
        />
      )}
    </div>
  );
}

{/* YENİ SİPARİŞ EKLEME MODALI */}
interface AddOrderModalProps {
  onClose: () => void;
  onAdd: (newOrder: Omit<Order, 'id'>, staffId: string) => void;
}

function AddOrderModal({ onClose, onAdd }: AddOrderModalProps) {
  const [customer, setCustomer] = useState('');
  const [total, setTotal] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [status, setStatus] = useState<Order['status']>('Hazırlanıyor');
  const [staffId, setStaffId] = useState('PER-101');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Sayı Kontrolü
    const numericTotal = Number(total);
    if (isNaN(numericTotal) || numericTotal <= 0) {
      window.alert('Lütfen geçerli bir sayı giriniz!');
      return;
    }

    // 2. Tarih Kontrolü
    if (!isValidDate(date)) {
      window.alert('Lütfen geçerli bir tarih giriniz!');
      return;
    }

    onAdd(
      {
        customer,
        total: formatCurrency(numericTotal),
        date,
        status,
      },
      staffId
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative border border-slate-100">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-800">Yeni Sipariş Oluştur</h3>
          <p className="text-xs text-slate-500">Sisteme yeni bir müşteri siparişi kaydı girin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> Müşteri Adı Soyadı *
            </label>
            <input
              type="text"
              required
              placeholder="Örn: Zeynep Arslan"
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-slate-400" /> Tutar (₺) *
              </label>
              <input
                type="number"
                min="1"
                step="any"
                required
                placeholder="Örn: 2500"
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Sipariş Tarihi *
              </label>
              <input
                type="date"
                min="2000-01-01"
                max="2099-12-31"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" /> Sipariş Durumu
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Order['status'])}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Hazırlanıyor">Hazırlanıyor</option>
                <option value="Kargoda">Kargoda</option>
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="İptal Edildi">İptal Edildi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-600 mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-indigo-500" /> Personel ID *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: PER-104"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full px-3 py-2 border border-indigo-200 bg-indigo-50/30 rounded-lg text-sm text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Siparişi Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

{/* SİPARİŞ DÜZENLEME MODALI */}
interface EditOrderModalProps {
  order: Order;
  onClose: () => void;
  onSave: (updatedOrder: Order, staffId: string) => void;
}

function EditOrderModal({ order, onClose, onSave }: EditOrderModalProps) {
  const [customer, setCustomer] = useState(order.customer);
  const [total, setTotal] = useState(parseAmount(order.total).toString());
  const [date, setDate] = useState(order.date);
  const [status, setStatus] = useState<Order['status']>(order.status);
  const [staffId, setStaffId] = useState('PER-104');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Sayı Kontrolü
    const numericTotal = Number(total);
    if (isNaN(numericTotal) || numericTotal <= 0) {
      window.alert('Lütfen geçerli bir sayı giriniz!');
      return;
    }

    // 2. Tarih Kontrolü
    if (!isValidDate(date)) {
      window.alert('Lütfen geçerli bir tarih giriniz!');
      return;
    }

    onSave(
      {
        ...order,
        customer,
        total: formatCurrency(numericTotal),
        date,
        status,
      },
      staffId
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative border border-slate-100">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            {order.id} Detayları
          </span>
          <h3 className="text-lg font-bold text-slate-800 mt-2">Sipariş Bilgilerini Düzenle</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-slate-400" /> Müşteri Adı Soyadı
            </label>
            <input
              type="text"
              required
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Banknote className="w-3.5 h-3.5 text-slate-400" /> Toplam Tutar (₺)
              </label>
              <input
                type="number"
                min="1"
                step="any"
                required
                value={total}
                onChange={(e) => setTotal(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" /> Sipariş Tarihi
              </label>
              <input
                type="date"
                min="2000-01-01"
                max="2099-12-31"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-slate-400" /> Sipariş Durumu
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as Order['status'])}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Hazırlanıyor">Hazırlanıyor</option>
                <option value="Kargoda">Kargoda</option>
                <option value="Tamamlandı">Tamamlandı</option>
                <option value="İptal Edildi">İptal Edildi</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-600 mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-indigo-500" /> İşlemi Yapan Personel ID *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: PER-104"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full px-3 py-2 border border-indigo-200 bg-indigo-50/30 rounded-lg text-sm text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors"
            >
              İptal
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
            >
              Siparişi Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}