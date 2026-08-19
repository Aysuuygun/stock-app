import { useState } from 'react';
import { Header } from '../components/Header';
import { 
  Truck, 
  Phone, 
  Mail, 
  PlusCircle, 
  Edit2, 
  Trash2, 
  RotateCcw, 
  Star, 
  X, 
  Building2, 
  Filter,
  UserCheck,
  History,
  BadgeCheck,
  PackagePlus,
  Boxes
} from 'lucide-react';

export interface SupplyDemand {
  productName: string;
  quantity: number;
}

export interface Supplier {
  id: string;
  name: string;
  category: string;
  phone: string;
  email: string;
  isTopSupplier?: boolean;
  rating: number;
  deliveryTypes: string[];
  demands: SupplyDemand[];
  isUpdated?: boolean;
  updatedBy?: string;
  updatedAt?: string;
}

// Varsayılan Tedarikçi Verileri
const INITIAL_SUPPLIERS: Supplier[] = [
  {
    id: 'TED-101',
    name: 'Atlas Lojistik A.Ş.',
    category: 'Lojistik & Kargo',
    phone: '0212 555 0101',
    email: 'operasyon@atlaslojistik.com',
    isTopSupplier: true,
    rating: 4.9,
    deliveryTypes: ['Elektronik', 'Aksesuar'],
    demands: [
      { productName: 'Kablosuz Kulaklık', quantity: 250 },
      { productName: 'Akıllı Saat', quantity: 100 }
    ],
    isUpdated: true,
    updatedBy: 'PER-104',
    updatedAt: '12.08.2026 22:45'
  },
  {
    id: 'TED-102',
    name: 'Global Depo & Tekstil',
    category: 'Giyim',
    phone: '0216 444 0202',
    email: 'siparis@globaldepo.com',
    isTopSupplier: true,
    rating: 4.8,
    deliveryTypes: ['Giyim', 'Aksesuar'],
    demands: [
      { productName: 'Pamuklu T-Shirt', quantity: 500 }
    ]
  },
  {
    id: 'TED-103',
    name: 'Kozmetik Kimya Sanayi',
    category: 'Güzellik & Parfüm',
    phone: '0232 333 0303',
    email: 'tedarik@kozmetikkimya.com',
    isTopSupplier: false,
    rating: 4.5,
    deliveryTypes: ['Güzellik', 'Parfüm'],
    demands: [
      { productName: 'Maskara Lash Princess', quantity: 400 },
      { productName: 'Ruj - Kırmızı ', quantity: 300 }
    ]
  }
];

const CATEGORIES = ['Tümü', 'Elektronik', 'Güzellik & Parfüm', 'Parfüm', 'Mobilya', 'Giyim', 'Lojistik & Kargo'];

export default function Suppliers() {
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [selectedCategory, setSelectedCategory] = useState<string>('Tümü');
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Kategoriye Göre Filtreleme
  const filteredSuppliers = suppliers.filter((s) => {
    if (selectedCategory === 'Tümü') return true;
    return (
      s.category === selectedCategory ||
      s.deliveryTypes.includes(selectedCategory)
    );
  });

  // API'den Yenile (Sıfırla)
  const handleResetSuppliers = () => {
    const isConfirmed = window.confirm("Tedarikçi verilerini sıfırlayıp ilk verilere dönmek istediğinize emin misiniz?");
    if (isConfirmed) {
      setSuppliers(INITIAL_SUPPLIERS);
      setSelectedCategory('Tümü');
      setTimeout(() => {
        window.alert("Tedarikçi verileri başarıyla sıfırlandı!");
      }, 100);
    }
  };

  // Yeni Tedarikçi Ekleme
  const handleAddSupplier = (newSupplier: Omit<Supplier, 'id'>, staffId: string) => {
    const generatedId = `TED-${100 + suppliers.length + 1}`;
    const now = new Date();
    const timeString = `${now.toLocaleDateString('tr-TR')} ${now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;

    const supplierToAdd: Supplier = {
      ...newSupplier,
      id: generatedId,
      updatedBy: staffId || 'PER-101',
      updatedAt: timeString,
    };

    setSuppliers([supplierToAdd, ...suppliers]);
    setIsAddModalOpen(false);

    setTimeout(() => {
      window.alert(`"${supplierToAdd.name}" firması ${staffId} personeli tarafından eklendi!`);
    }, 100);
  };

  // Tedarikçi Güncelleme
  const handleSaveSupplier = (updatedSupplier: Supplier, staffId: string) => {
    const isConfirmed = window.confirm(`"${updatedSupplier.name}" firmasının bilgilerini güncellemek istediğinize emin misiniz?`);

    if (isConfirmed) {
      const now = new Date();
      const timeString = `${now.toLocaleDateString('tr-TR')} ${now.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`;

      const finalSupplier: Supplier = {
        ...updatedSupplier,
        isUpdated: true,
        updatedBy: staffId || 'PER-104',
        updatedAt: timeString,
      };

      setSuppliers(suppliers.map((s) => (s.id === updatedSupplier.id ? finalSupplier : s)));
      setEditingSupplier(null);

      setTimeout(() => {
        window.alert(`"${updatedSupplier.name}" firma bilgileri ${staffId} personeli tarafından güncellendi!`);
      }, 100);
    }
  };

  // Tedarikçi Silme
  const handleDeleteSupplier = (supplier: Supplier) => {
    const isConfirmed = window.confirm(`"${supplier.name}" firmasını listeden silmek istediğinize emin misiniz?`);

    if (isConfirmed) {
      setSuppliers(suppliers.filter((s) => s.id !== supplier.id));

      setTimeout(() => {
        window.alert(`"${supplier.name}" firması listeden çıkarıldı!`);
      }, 100);
    }
  };

 return (
  <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-12 transition-colors duration-300">
      <Header />

      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Üst Bar ve İşlem Butonları */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Truck className="w-6 h-6 text-indigo-600" /> Tedarik Zinciri & Taşıyıcı Yönetimi
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Tedarikçi sipariş miktarlarını ve personel işlem geçmişini canlı yönetin</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetSuppliers}
              className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-2 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> API'den Yenile (Sıfırla)
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition-all"
            >
              <PlusCircle className="w-4 h-4" /> Yeni Tedarikçi Ekle
            </button>
          </div>
        </div>

        {/* AKILLI KATEGORİ FİLTRESİ */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 mb-3">
            <Filter className="w-4 h-4 text-indigo-600" /> Ürün Gruplarına Göre Filtreleyin:
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white font-bold shadow-sm shadow-indigo-600/30'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* TEDARİKÇİ KARTLARI LİSTESİ */}
        {filteredSuppliers.length === 0 ? (
          <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-500">
            Seçilen kategoride tedarikçi firma bulunamadı.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredSuppliers.map((supplier) => (
              <div
                key={supplier.id}
                className={`bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4 ${
                  supplier.isUpdated ? 'bg-amber-50/10' : ''
                }`}
              >
                <div className="space-y-3">
                  {/* Başlık ve Öne Çıkan Rozeti */}
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-slate-800 text-base">{supplier.name}</h3>
                        {supplier.isTopSupplier && (
                          <span className="text-[10px] font-extrabold bg-amber-500/15 text-amber-700 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> ÖNE ÇIKAN
                          </span>
                        )}
                        {supplier.isUpdated && (
                          <span className="text-[10px] font-extrabold bg-amber-500/15 text-amber-700 border border-amber-500/30 px-2 py-0.5 rounded-md flex items-center gap-1">
                            <BadgeCheck className="w-3 h-3 text-amber-600" /> GÜNCELLENDİ
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-medium mt-0.5">{supplier.id} • {supplier.category}</p>
                    </div>

                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200 text-amber-800 text-xs font-extrabold">
                      <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" /> {supplier.rating}
                    </div>
                  </div>

                  {/* TEDARİK / SİPARİŞ TALEPLERİ VE ADETLERİ */}
                  <div className="bg-slate-50/80 p-3 rounded-xl border border-slate-100 space-y-2">
                    <p className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                      <Boxes className="w-3.5 h-3.5 text-indigo-600" /> Aktif Tedarik / Sipariş Talepleri:
                    </p>
                    {supplier.demands && supplier.demands.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {supplier.demands.map((demand, idx) => (
                          <div key={idx} className="bg-white px-2.5 py-1.5 rounded-lg border border-slate-200/80 flex items-center justify-between text-xs">
                            <span className="font-medium text-slate-700 truncate max-w-[120px]">{demand.productName}</span>
                            <span className="font-extrabold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                              {demand.quantity} Adet
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-[11px] text-slate-400 italic">Henüz aktif sipariş talebi girilmedi.</p>
                    )}
                  </div>
                </div>

                {/* İletişim Bilgileri + Son İşlem Yapan Personel + İşlem Butonları */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="space-y-1 text-xs text-slate-600">
                    <p className="flex items-center gap-1.5 font-medium">
                      <Phone className="w-3.5 h-3.5 text-slate-400" /> {supplier.phone}
                    </p>
                    {supplier.updatedBy && (
                      <div className="pt-1 text-[11px]">
                        <span className="font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 inline-flex items-center gap-1">
                          <UserCheck className="w-3 h-3 text-indigo-600" /> {supplier.updatedBy}
                        </span>
                        {supplier.updatedAt && (
                          <span className="text-[10px] text-slate-400 ml-1.5 inline-flex items-center gap-0.5">
                            <History className="w-2.5 h-2.5" /> {supplier.updatedAt}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingSupplier(supplier)}
                      className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                      title="Tedarikçiyi Düzenle"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteSupplier(supplier)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Tedarikçiyi Sil"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* YENİ TEDARİKÇİ EKLEME MODALI */}
      {isAddModalOpen && (
        <AddSupplierModal
          onClose={() => setIsAddModalOpen(false)}
          onAdd={handleAddSupplier}
        />
      )}

      {/* TEDARİKÇİ DÜZENLEME MODALI */}
      {editingSupplier && (
        <EditSupplierModal
          supplier={editingSupplier}
          onClose={() => setEditingSupplier(null)}
          onSave={handleSaveSupplier}
        />
      )}
    </div>
  );
}

{/* YENİ TEDARİKÇİ EKLEME MODALI BİLEŞENİ */}
interface AddSupplierModalProps {
  onClose: () => void;
  onAdd: (newSupplier: Omit<Supplier, 'id'>, staffId: string) => void;
}

function AddSupplierModal({ onClose, onAdd }: AddSupplierModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Lojistik & Kargo');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [rating, setRating] = useState('4.5');
  const [staffId, setStaffId] = useState('PER-101');
  const [isTopSupplier, setIsTopSupplier] = useState(false);
  
  const [demands, setDemands] = useState<SupplyDemand[]>([
    { productName: 'Kablosuz Kulaklık', quantity: 100 }
  ]);
  const [newProdName, setNewProdName] = useState('');
  const [newProdQty, setNewProdQty] = useState('');

  const addDemandItem = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (!newProdName.trim()) {
      window.alert('Lütfen ürün adı giriniz!');
      return;
    }
    const qty = Number(newProdQty);
    if (isNaN(qty) || qty <= 0) {
      window.alert('Lütfen geçerli bir sayı giriniz!');
      return;
    }
    setDemands([...demands, { productName: newProdName.trim(), quantity: qty }]);
    setNewProdName('');
    setNewProdQty('');
  };

  const removeDemandItem = (index: number) => {
    setDemands(demands.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      window.alert('Lütfen geçerli bir sayı giriniz! (Puan 1-5 arasında olmalıdır)');
      return;
    }

    onAdd(
      {
        name,
        category,
        phone,
        email,
        rating: numRating,
        isTopSupplier,
        deliveryTypes: [category],
        demands,
      },
      staffId
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative border border-slate-100 my-8">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-indigo-600" /> Yeni Tedarikçi Firma Ekle
          </h3>
          <p className="text-xs text-slate-500">Tedarikçi firma ve sipariş adet bilgilerini girin</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Firma Adı *</label>
            <input
              type="text"
              required
              placeholder="Örn: Hızlı Kargo Lojistik A.Ş."
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Hizmet Kategorisi</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Lojistik & Kargo">Lojistik & Kargo</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Güzellik & Parfüm">Güzellik & Parfüm</option>
                <option value="Mobilya">Mobilya</option>
                <option value="Giyim">Giyim</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Puan (1-5 Arası) *</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Telefon *</label>
              <input
                type="text"
                required
                placeholder="Örn: 0212 555 0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-600 mb-1 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> Personel ID *
              </label>
              <input
                type="text"
                required
                placeholder="Örn: PER-101"
                value={staffId}
                onChange={(e) => setStaffId(e.target.value)}
                className="w-full px-3 py-2 border border-indigo-200 bg-indigo-50/30 rounded-lg text-sm text-slate-900 font-bold focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          {/* TEDARİK EDİLEN ÜRÜN VE ADET SİPARİŞ LİSTESİ */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <PackagePlus className="w-4 h-4 text-indigo-600" /> Tedarik Edilen Ürün & Adet Talepleri:
            </label>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Ürün Adı (Örn: Kulaklık)"
                value={newProdName}
                onChange={(e) => setNewProdName(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 bg-white"
              />
              <input
                type="number"
                min="1"
                placeholder="Adet"
                value={newProdQty}
                onChange={(e) => setNewProdQty(e.target.value)}
                className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 bg-white"
              />
              <button
                type="button"
                onClick={addDemandItem}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-lg hover:bg-indigo-100"
              >
                Ekle
              </button>
            </div>

            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {demands.map((d, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-lg text-xs border border-slate-200">
                  <span className="font-medium text-slate-700">{d.productName}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-indigo-600">{d.quantity} Adet</span>
                    <button
                      type="button"
                      onClick={() => removeDemandItem(i)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
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
              Tedarikçiyi Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

{/* TEDARİKÇİ DÜZENLEME MODALI BİLEŞENİ */}
interface EditSupplierModalProps {
  supplier: Supplier;
  onClose: () => void;
  onSave: (updatedSupplier: Supplier, staffId: string) => void;
}

function EditSupplierModal({ supplier, onClose, onSave }: EditSupplierModalProps) {
  const [name, setName] = useState(supplier.name);
  const [category, setCategory] = useState(supplier.category);
  const [phone, setPhone] = useState(supplier.phone);
  const [email, setEmail] = useState(supplier.email);
  const [rating, setRating] = useState(supplier.rating.toString());
  const [staffId, setStaffId] = useState('PER-104');
  const [isTopSupplier, setIsTopSupplier] = useState(supplier.isTopSupplier || false);
  const [demands, setDemands] = useState<SupplyDemand[]>(supplier.demands || []);
  
  const [newProdName, setNewProdName] = useState('');
  const [newProdQty, setNewProdQty] = useState('');

  const addDemandItem = (e: React.MouseEvent) => {
    e.preventDefault(); 
    if (!newProdName.trim()) {
      window.alert('Lütfen ürün adı giriniz!');
      return;
    }
    const qty = Number(newProdQty);
    if (isNaN(qty) || qty <= 0) {
      window.alert('Lütfen geçerli bir sayı giriniz!');
      return;
    }
    setDemands([...demands, { productName: newProdName.trim(), quantity: qty }]);
    setNewProdName('');
    setNewProdQty('');
  };

  const removeDemandItem = (index: number) => {
    setDemands(demands.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const numRating = Number(rating);
    if (isNaN(numRating) || numRating < 1 || numRating > 5) {
      window.alert('Lütfen geçerli bir sayı giriniz! (Puan 1-5 arasında olmalıdır)');
      return;
    }

    onSave(
      {
        ...supplier,
        name,
        category,
        phone,
        email,
        rating: numRating,
        isTopSupplier,
        deliveryTypes: [category],
        demands, 
      },
      staffId
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 relative border border-slate-100 my-8">
        <button onClick={onClose} className="absolute right-4 top-4 text-slate-400 hover:text-slate-600 p-1 rounded-lg">
          <X className="w-5 h-5" />
        </button>

        <div className="mb-5">
          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
            {supplier.id}
          </span>
          <h3 className="text-lg font-bold text-slate-800 mt-2">Tedarikçi & Ürün Taleplerini Düzenle</h3>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Firma Adı</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Hizmet Kategorisi</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="Lojistik & Kargo">Lojistik & Kargo</option>
                <option value="Elektronik">Elektronik</option>
                <option value="Güzellik & Parfüm">Güzellik & Parfüm</option>
                <option value="Mobilya">Mobilya</option>
                <option value="Giyim">Giyim</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Puan (1-5 Arası)</label>
              <input
                type="number"
                min="1"
                max="5"
                step="0.1"
                required
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1">Telefon</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-indigo-600 mb-1 flex items-center gap-1">
                <UserCheck className="w-3.5 h-3.5" /> İşlemi Yapan Personel ID *
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

          {/* TEDARİK EDİLEN ÜRÜN VE ADET SİPARİŞ LİSTESİ DÜZENLEYİCİ */}
          <div className="pt-2 border-t border-slate-100">
            <label className="block text-xs font-bold text-slate-700 mb-2 flex items-center gap-1.5">
              <PackagePlus className="w-4 h-4 text-indigo-600" /> Tedarik Edilen Ürün & Adet Talepleri:
            </label>

            <div className="flex items-center gap-2 mb-3">
              <input
                type="text"
                placeholder="Ürün Adı"
                value={newProdName}
                onChange={(e) => setNewProdName(e.target.value)}
                className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 bg-white"
              />
              <input
                type="number"
                min="1"
                placeholder="Adet"
                value={newProdQty}
                onChange={(e) => setNewProdQty(e.target.value)}
                className="w-20 px-3 py-1.5 border border-slate-300 rounded-lg text-xs text-slate-900 bg-white"
              />
              <button
                type="button"
                onClick={addDemandItem}
                className="px-3 py-1.5 bg-indigo-50 text-indigo-600 font-bold text-xs rounded-lg hover:bg-indigo-100"
              >
                Ekle
              </button>
            </div>

            <div className="space-y-1.5 max-h-32 overflow-y-auto">
              {demands.map((d, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-50 px-3 py-1.5 rounded-lg text-xs border border-slate-200">
                  <span className="font-medium text-slate-700">{d.productName}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-indigo-600">{d.quantity} Adet</span>
                    <button
                      type="button"
                      onClick={() => removeDemandItem(i)}
                      className="text-slate-400 hover:text-rose-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
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
              Tedarikçiyi Güncelle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}