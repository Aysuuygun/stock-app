import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { ProductForm } from '../components/ProductForm';
import { ProductList } from '../components/ProductList';
import { EditProductModal } from '../components/EditProductModal';
import { fetchApiProducts } from '../utils/api';
import type { Product } from '../types/product';
import { 
  Search, 
  ArrowUpDown, 
  FileSpreadsheet, 
  RotateCcw, 
  AlertTriangle,
  Package,
  X
} from 'lucide-react';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  
  //Arama, Sıralama ve Kritik Stok Filtre State'leri
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'stock-asc' | 'stock-desc' | 'name-asc'>('default');
  const [showLowStockOnly, setShowLowStockOnly] = useState(false);
  const [isAlertDismissed, setIsAlertDismissed] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const savedProducts = localStorage.getItem('products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const apiData = await fetchApiProducts();
      setProducts(apiData);
      localStorage.setItem('products', JSON.stringify(apiData));
    }
  };

  const handleReset = async () => {
    const isConfirmed = window.confirm("Tüm stok verilerini sıfırlayıp API'deki varsayılan ürünlere dönmek istediğinize emin misiniz?");
    if (isConfirmed) {
      localStorage.removeItem('products');
      const apiData = await fetchApiProducts();
      setProducts(apiData);
      localStorage.setItem('products', JSON.stringify(apiData));
      
      setTimeout(() => {
        window.alert("Stok verileri başarıyla sıfırlandı!");
      }, 100);
    }
  };

  const handleAddProduct = (newProd: Omit<Product, 'id'>) => {
    const nextId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const createdProduct = { ...newProd, id: nextId };
    const updatedList = [createdProduct, ...products];
    setProducts(updatedList);
    localStorage.setItem('products', JSON.stringify(updatedList));
  };

  const handleDeleteProduct = (id: number) => {
    const updatedList = products.filter(p => p.id !== id);
    setProducts(updatedList);
    localStorage.setItem('products', JSON.stringify(updatedList));
  };

  const handleSaveEdit = (updatedProd: Product) => {
    const updatedList = products.map(p => p.id === updatedProd.id ? updatedProd : p);
    setProducts(updatedList);
    localStorage.setItem('products', JSON.stringify(updatedList));
  };

  // Excel / CSV Dışa Aktarma
  const exportToCSV = () => {
    if (products.length === 0) {
      window.alert('Dışa aktarılacak ürün bulunmuyor!');
      return;
    }

    const headers = ['ID', 'Ürün Adı', 'Kategori', 'Fiyat (TL)', 'Stok (Adet)'];
    const rows = products.map(p => [p.id, `"${p.title}"`, p.category, p.price, p.stock]);
    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Stok_Raporu_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // KRİTİK STOKTAKİ ÜRÜNLERİ TESPİT ETME (10 Adet ve Altı)
  const lowStockProducts = products.filter(p => p.stock < 10);

  // Filtrelenmiş ve Sıralanmış Ürün Listesi
  const filteredAndSortedProducts = products
    .filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLowStock = showLowStockOnly ? p.stock < 10 : true;
      return matchesSearch && matchesLowStock;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock-asc') return a.stock - b.stock;
      if (sortBy === 'stock-desc') return b.stock - a.stock;
      if (sortBy === 'name-asc') return a.title.localeCompare(b.title);
      return 0;
    });

  const totalTypes = products.length;
  const totalStock = products.reduce((acc, curr) => acc + curr.stock, 0);

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-12 transition-colors duration-300">
      <Header />

      <div className="max-w-6xl mx-auto px-4 space-y-6">
        
        {/* KRİTİK STOK UYARI BANNER'I */}
        {lowStockProducts.length > 0 && !isAlertDismissed && (
          <div className="bg-gradient-to-r from-rose-500 to-amber-600 text-white p-4 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-3 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-md">
                <AlertTriangle className="w-5 h-5 text-white animate-bounce" />
              </div>
              <div>
                <h3 className="font-bold text-sm">Kritik Stok Uyarısı!</h3>
                <p className="text-xs text-rose-100">
                  Sistemde stoğu 10 adedin altına düşmüş <strong>{lowStockProducts.length} adet ürün</strong> bulunuyor.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowLowStockOnly(!showLowStockOnly)}
                className="px-3 py-1.5 bg-white text-rose-700 hover:bg-rose-50 font-bold text-xs rounded-xl shadow-sm transition-colors"
              >
                {showLowStockOnly ? 'Tüm Ürünleri Göster' : 'Kritik Ürünleri Filtrele'}
              </button>
              <button
                onClick={() => setIsAlertDismissed(true)}
                className="p-1.5 hover:bg-white/20 rounded-lg text-rose-100 transition-colors"
                title="Kapat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Üst Özet Kartı ve Butonlar */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4 transition-colors">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Toplam Çeşit</p>
              <p className="text-2xl font-black text-slate-800 dark:text-slate-100">{totalTypes}</p>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-800"></div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Toplam Stok Adedi</p>
              <p className="text-2xl font-black text-indigo-600 dark:text-indigo-400">{totalStock}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 border border-emerald-200 dark:border-emerald-800/60 px-3.5 py-2 rounded-xl transition-colors shadow-sm"
              title="Excel/CSV Formatında İndir"
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Excel / Rapor İndir
            </button>

            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 px-3.5 py-2 rounded-xl transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> API'den Yenile (Sıfırla)
            </button>
          </div>
        </div>

        {/* ARAMA, FİLTRE VE CANLI SIRALAMA BARIBAR */}
        <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-3 transition-colors">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Ürün adı veya kategori ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowLowStockOnly(!showLowStockOnly)}
              className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
                showLowStockOnly
                  ? 'bg-rose-500 text-white border-rose-600 shadow-sm'
                  : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100'
              }`}
            >
              <AlertTriangle className="w-3.5 h-3.5" /> Kritik Stoklar ({lowStockProducts.length})
            </button>

            <div className="h-6 w-px bg-slate-200 dark:bg-slate-800 hidden sm:block"></div>

            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="w-4 h-4 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-800 dark:text-slate-200 py-2 px-3 focus:outline-none font-medium"
              >
                <option value="default">Sıralama: Varsayılan</option>
                <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
                <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
                <option value="stock-asc">Stok: Azalana Göre</option>
                <option value="stock-desc">Stok: Artana Göre</option>
                <option value="name-asc">İsim: A - Z</option>
              </select>
            </div>
          </div>
        </div>

        {/* ANA İÇERİK: FORM VE BİLEŞENLER */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProductForm onAddProduct={handleAddProduct} />
          </div>

          <div className="lg:col-span-2">
            <ProductList
              products={filteredAndSortedProducts}
              onDelete={handleDeleteProduct}
              onEdit={(prod) => setEditingProduct(prod)}
            />
          </div>
        </div>
      </div>

      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          onClose={() => setEditingProduct(null)}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  );
}