# React / Remix Stok ve Envanter Yönetim Uygulaması

React tabanlı Remix framework ile geliştirilmiş, LocalStorage ve API entegrasyonlu kapsamlı bir stok, sipariş ve tedarikçi yönetim (CRUD) uygulaması.

##  Özellikler

- Harici API ve Mock veri entegrasyonu
- LocalStorage ile veri kalıcılığı (Persist)
- Yeni ürün ve stok girişi (Form doğrulama)
- Ürün düzenleme ve silme (Modal destekli CRUD)
- Kritik stok seviyesi uyarısı ve dinamik filtreleme
- Tedarikçi ve sipariş yaşam döngüsü takibi
- TypeScript desteği
- Netlify'a deploy edilebilir

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




