# React / Remix Stok ve Envanter Yönetim Uygulaması

React tabanlı Remix framework ile geliştirilmiş, LocalStorage ve API entegrasyonlu kapsamlı bir stok, sipariş ve tedarikçi yönetim (CRUD) uygulaması.

##  Özellikler

- ✅ Harici API ve Mock veri entegrasyonu
- ✅ LocalStorage ile veri kalıcılığı (Persist)
- ✅ Yeni ürün ve stok girişi (Form doğrulama)
- ✅ Ürün düzenleme ve silme (Modal destekli CRUD)
- ✅ Kritik stok seviyesi uyarısı ve dinamik filtreleme
- ✅ Tedarikçi ve sipariş yaşam döngüsü takibi
- ✅ TypeScript desteği
- ✅ Netlify'a deploy edilebilir

##  Kurulum ve Çalıştırma

### Ön Gereksinimler

- Node.js (versiyon 18 veya üzeri)
- npm veya yarn

### Adımlar

1. **Proje bağımlılıklarını yükleyin:**
   ```bash
   npm install

2.**Geliştirme sunucusunu başlatın:**

 ```bash
   npm run dev


Artık uygulamanız http://localhost:5173 adresinde çalışıyor olmalı!

Deploy (Netlify)
GitHub'a push et  
MD

Netlify'da "Import an existing project" seçeneğini seç  
MD

GitHub reposunu (stock-app) bağla  
MD

Build komutu: npm run build

  
MD

Publish dizini: build/client

  
MD

Veya Netlify CLI ile:

Bash
npm install -g netlify-cli
netlify login
netlify deploy --prod
