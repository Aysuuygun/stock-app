import React, { useState } from 'react';
import { PlusCircle } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductFormProps {
  onAddProduct: (product: Omit<Product, 'id'>) => void;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct }) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Elektronik');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !stock) return;

    const addedTitle = title;

    // 1. Önce ürünü ekle
    onAddProduct({
      title,
      category,
      price: Number(price),
      stock: Number(stock),
    });

    setTitle('');
    setPrice('');
    setStock('');

    // 2. Ekran yenilenip kart eklendikten sonra pop-up göster
    setTimeout(() => {
      window.alert(`"${addedTitle}" ürünü başarıyla stoklara eklendi!`);
    }, 100);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
        <PlusCircle className="w-5 h-5 text-indigo-600" /> Yeni Stok Ürünü Ekle
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-600 mb-1">Ürün Adı *</label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Örn: Kablosuz Kulaklık"
            className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Kategori</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:outline-none"
            >
              <option value="Elektronik">Elektronik</option>
              <option value="Güzellik">Güzellik</option>
              <option value="Parfüm">Parfüm</option>
              <option value="Aksesuar">Aksesuar</option>
              <option value="Mobilya">Mobilya</option>
              <option value="Giyim">Giyim</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Fiyat (₺) *</label>
            <input
              type="number"
              required
              min="1"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="0.00"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1">Stok Miktarı *</label>
            <input
              type="number"
              required
              min="0"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              placeholder="0"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm text-slate-900 bg-white focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg text-sm transition-colors shadow-sm"
        >
          Ürün Kaydet
        </button>
      </form>
    </div>
  );
};