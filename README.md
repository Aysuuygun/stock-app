# React / Remix Stok ve Envanter Yönetim Uygulaması

React tabanlı Remix framework ile geliştirilmiş, LocalStorage ve API entegrasyonlu kapsamlı bir stok, sipariş ve tedarikçi yönetim (CRUD) uygulaması.

## Özellikler

- **Envanter ve Ürün Yönetimi (CRUD):** Yeni ürün ekleme, anlık düzenleme ve onaylı silme mekanizması
- **Kritik Stok Uyarı Sistemi:** Belirlenen eşik altındaki ürünler için görsel uyarı rozetleri[cite: 1]
- **Gelişmiş Arama ve Filtreleme:** Ürün adı/koda göre anlık arama, kategori filtreleme ve fiyata/stoğa göre sıralama[cite: 1]
- **Tedarikçi Yönetimi:** Tedarikçi iletişim bilgileri, kategori ve performans puanlama sistemi[cite: 1]
- **Sipariş Takibi:** Otomatik sipariş oluşturma ve sipariş durum yaşam döngüsü (Beklemede, Hazırlanıyor, Teslim Edildi)[cite: 1]
- **Finansal Raporlama ve Analiz:** Toplam envanter değeri, kategori bazlı stok dağılımı ve analitik özet kartları[cite: 1]
- **LocalStorage ile Veri Kalıcılığı:** Tarayıcı kapansa dahi tüm verilerin cihazda güvenle saklanması[cite: 1]
- **Modern & Duyarlı UI/UX:** Karanlık/Aydınlık (Dark/Light) tema desteği ve mobil uyumlu Tailwind tasarımı[cite: 1]
- **TypeScript & SPA Mimarisi:** Tam tip güvenliği ve Netlify üzerinde hızlı statik web dağıtımı[cite: 1]

##  Kurulum ve Çalıştırma

### Ön Gereksinimler

- Node.js (versiyon 18 veya üzeri)
- npm veya yarn

### Adımlar

1. **Proje bağımlılıklarını yükleyin:**
   ```bash
   npm install

2. **Geliştirme sunucusunu başlatın:**
   ```bash
   npm run dev


Artık uygulamanız http://localhost:5173 adresinde çalışıyor olmalı!

## Deploy (Netlify)

1. GitHub'a push et
2. Netlify'da "Import an existing project" seçeneğini seç
3. GitHub reposunu (stock-app) bağla
4. Build komutu: `npm run build`
5. Publish dizini: `build/client`

Veya Netlify CLI ile:

```bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
```

## Proje Yapısı

```text
app/
├── components/
│   ├── EditProductModal.tsx   # Ürün düzenleme modalı
│   ├── Header.tsx             # Üst menü ve tema kontrol çubuğu
│   ├── ProductForm.tsx        # Yeni ürün ekleme formu
│   └── ProductList.tsx        # Liste görünümü ve kartlar
├── hooks/
│   └── useProducts.ts         # Custom hook (CRUD işlemleri)
├── routes/
│   ├── home.tsx               # Ana sayfa
│   ├── orders.tsx             # Sipariş takibi
│   ├── reports.tsx            # Raporlar ve analizler
│   └── suppliers.tsx          # Tedarikçi yönetimi
├── styles/
│   └── app.css                # Global stiller
├── types/
│   └── product.ts             # TypeScript tipleri
├── utils/
│   ├── api.ts                 # API fonksiyonları
│   └── storage.ts             # LocalStorage yardımcıları
└── root.tsx                   # Uygulama kökü
```

## Teknolojiler

- **Remix / React Router** - React framework
- **TypeScript** - Tip güvenliği
- **Tailwind CSS** - Modern ve duyarlı stillendirme
- **Lucide React** - Arayüz ikonları
- **Vite** - Build tool
- **Netlify** - Hosting




