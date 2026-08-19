import { useState } from 'react';
import { Header } from '../components/Header';
import { 
  BarChart3, 
  TrendingUp, 
  DollarSign, 
  PackageCheck, 
  PieChart, 
  Truck, 
  Info, 
  ShieldCheck, 
  Calculator, 
  Award,
  ArrowUpRight,
  Boxes
} from 'lucide-react';

export default function Reports() {
  // Yıllık Ürün Grubu Kar Dağılımı (Pasta Grafiği Verileri)
  const categoryProfitData = [
    { name: 'Elektronik & Aksesuar', profit: 68500, percentage: 42, color: 'bg-indigo-600', textColor: 'text-indigo-600' },
    { name: 'Giyim & Tekstil', profit: 39200, percentage: 24, color: 'bg-violet-500', textColor: 'text-violet-500' },
    { name: 'Güzellik & Parfüm', profit: 32600, percentage: 20, color: 'bg-emerald-500', textColor: 'text-emerald-500' },
    { name: 'Mobilya & Dekorasyon', profit: 22800, percentage: 14, color: 'bg-amber-500', textColor: 'text-amber-500' },
  ];

  // Tedarik & Lojistik Firmalarının Başarı ve Kullanım Oranları
  const supplierPerformance = [
    { name: 'Atlas Lojistik A.Ş.', completedOrders: 540, successRate: 98, rating: 4.9, category: 'Lojistik & Kargo' },
    { name: 'Global Depo & Tekstil', completedOrders: 380, successRate: 95, rating: 4.8, category: 'Giyim' },
    { name: 'Kozmetik Kimya Sanayi', completedOrders: 210, successRate: 92, rating: 4.5, category: 'Güzellik & Parfüm' },
    { name: 'Anadolu Mobilya & Ahşap', completedOrders: 110, successRate: 88, rating: 4.3, category: 'Mobilya' },
  ];

  return (
  <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pb-12 transition-colors duration-300">
      <Header />

      <div className="max-w-6xl mx-auto px-4 space-y-6">
        {/* Üst Sayfa Başlığı */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-indigo-600" /> Finansal Raporlar & Performans Analizi
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Sipariş karları, tedarikçi başarı oranları ve kategori dağılımlarını canlı inceleyin</p>
          </div>

          <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs font-bold">
            <TrendingUp className="w-4 h-4" /> Yıllık Büyüme: +%28.4
          </div>
        </div>

        {/* SİSTEM GENELİ CANLI METRİKLER (KPI CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                <DollarSign className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                <ArrowUpRight className="w-3 h-3" /> +12%
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Toplam Gelir Hacmi</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">₺163.100</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full">
                Net Kar
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Ortalama Kar Marjı</p>
            <p className="text-2xl font-black text-emerald-600 mt-0.5">%32.4</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-violet-50 text-violet-600 rounded-xl">
                <PackageCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-indigo-50 text-indigo-700 px-2 py-0.5 rounded-full">
                Sevkiyatlar
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Tamamlanan Siparişler</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">1.240 Adet</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                <Boxes className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full">
                Stok Hacmi
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">Tedarikçi Sipariş Talebi</p>
            <p className="text-2xl font-black text-slate-900 mt-0.5">1.950 Adet</p>
          </div>
        </div>

        {/* KAR ORANLARI NASIL HESAPLANIYOR? (AÇIKLAMA KUTUSU) */}
        <div className="bg-gradient-to-r from-slate-900 to-indigo-950 text-white p-6 rounded-2xl shadow-md border border-slate-800 relative overflow-hidden">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-indigo-500/20 text-indigo-400 rounded-xl border border-indigo-500/30">
              <Info className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-sm text-indigo-200 flex items-center gap-2">
                Kar Oranları Nasıl Belirlenir? (Hesaplama Metodolojisi)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Sistemdeki kar marjı hesaplamaları, <strong>Müşteri Satış Tutarından</strong> ilgili ürünün <strong>Tedarikçi Birim Maliyeti + Lojistik Sevkiyat Masrafı</strong> çıkarılarak otomatik hesaplanır. 
                Tamamlanan her sipariş ve tedarik edilen stok adedi, canlı kar marjı istatistiklerini anlık olarak günceller.
              </p>
            </div>
          </div>
        </div>

        {/* GRAFİKLER SEKSİYONU */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* 1. KATEGORİLERE GÖRE YILLIK KAR DAĞILIMI (PASTA GRAFİKİ GÖRSELLİĞİ) */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-indigo-600" /> Ürün Kategorilerinin Yıllık Kar Dağılımı
                </h3>
              </div>

              {/* Görsel Pasta Grafiği Temsili Barı */}
              <div className="h-4 w-full rounded-full overflow-hidden flex mb-6 shadow-inner bg-slate-100">
                {categoryProfitData.map((item, idx) => (
                  <div
                    key={idx}
                    style={{ width: `${item.percentage}%` }}
                    className={`${item.color} transition-all duration-500`}
                    title={`${item.name}: %${item.percentage}`}
                  />
                ))}
              </div>

              {/* Kategori Detay Listesi */}
              <div className="space-y-3">
                {categoryProfitData.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className={`w-3 h-3 rounded-full ${item.color}`}></span>
                      <span className="font-bold text-slate-700">{item.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-slate-900">₺{item.profit.toLocaleString('tr-TR')}</span>
                      <span className={`font-black px-2 py-0.5 rounded-md bg-white border border-slate-200 ${item.textColor}`}>
                        %{item.percentage}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 2. TEDARİKÇİ & LOJİSTİK FİRMALARI BAŞARI ORANLARI */}
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
                  <Truck className="w-5 h-5 text-indigo-600" /> Tedarikçi Performans & Kullanım Oranları
                </h3>
                <span className="text-xs text-slate-400">Teslimat Başarısı</span>
              </div>

              <div className="space-y-4">
                {supplierPerformance.map((supplier, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div>
                        <span className="font-bold text-slate-800">{supplier.name}</span>
                        <span className="text-[10px] text-slate-400 ml-2">({supplier.completedOrders} Sevkiyat)</span>
                      </div>
                      <div className="flex items-center gap-2 font-bold">
                        <span className="text-emerald-600 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" /> %{supplier.successRate} Başarı
                        </span>
                      </div>
                    </div>

                    {/* İlerleme Çubuğu (Progress Bar) */}
                    <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          supplier.successRate >= 95 ? 'bg-emerald-500' : 'bg-indigo-500'
                        }`}
                        style={{ width: `${supplier.successRate}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}