# React / Remix Stok ve Envanter Yönetim Uygulaması

React tabanlı Remix framework ile geliştirilmiş, LocalStorage ve API entegrasyonlu kapsamlı bir stok, sipariş ve tedarikçi yönetim (CRUD) uygulaması.

## Özellikler

- **Envanter ve Ürün Yönetimi (CRUD):** Yeni ürün ekleme, anlık düzenleme ve onaylı silme mekanizması
- **Kritik Stok Uyarı Sistemi:** Belirlenen eşik altındaki ürünler için görsel uyarı rozetleri
- **Gelişmiş Arama ve Filtreleme:** Ürün adı/koda göre anlık arama, kategori filtreleme ve fiyata/stoğa göre sıralama
- **Tedarikçi Yönetimi:** Tedarikçi iletişim bilgileri, kategori ve performans puanlama sistemi
- **Sipariş Takibi:** Otomatik sipariş oluşturma ve sipariş durum yaşam döngüsü (Beklemede, Hazırlanıyor, Teslim Edildi)
- **Finansal Raporlama ve Analiz:** Toplam envanter değeri, kategori bazlı stok dağılımı ve analitik özet kartları
- **LocalStorage ile Veri Kalıcılığı:** Tarayıcı kapansa dahi tüm verilerin cihazda güvenle saklanması
- **Modern & Duyarlı UI/UX:** Karanlık/Aydınlık (Dark/Light) tema desteği ve mobil uyumlu Tailwind tasarımı
- **TypeScript & SPA Mimarisi:** Tam tip güvenliği ve Netlify üzerinde hızlı statik web dağıtımı

##  Kurulum ve Çalıştırma

### Ön Gereksinimler

- Node.js (versiyon 18 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın ve proje dizinine geçin:**
   ```bash
   git clone [https://github.com/Aysuuygun/stock-app.git](https://github.com/Aysuuygun/stock-app.git)
   cd stock-app
   ```[cite: 1]

2. **Gerekli tüm paket bağımlılıklarını yükleyin:**
   ```bash
   npm install
   ```

3. **Geliştirme (development) sunucusunu başlatın:**
   ```bash
   npm run dev
   ```

4. **Uygulamayı tarayıcınızda açın:**
   Terminalde belirtilen yerel sunucu adresine gidin:
   `http://localhost:5173`

5. **(Opsiyonel) Üretim sürümü (Production build) çıktısı almak için:**
   ```bash
   npm run build
   ```


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


## Bağlantılar

- **Canlı Demo (Netlify):** [https://stock-app-web.netlify.app](https://stock-app-web.netlify.app)
- **GitHub Reposu:** [https://github.com/Aysuuygun/stock-app](https://github.com/Aysuuygun/stock-app)

## Geliştirici

Aysu Uygun
Software Persona Yazılım Mesleki Gelişim Stajyeri




