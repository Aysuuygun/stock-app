import React from 'react';
import { Trash2, Edit2, Box } from 'lucide-react';
import type { Product } from '../types/product';

interface ProductListProps {
  products: Product[];
  onDelete: (id: number) => void;
  onEdit: (product: Product) => void;
}

export const ProductList: React.FC<ProductListProps> = ({ products, onDelete, onEdit }) => {
  const handleDeleteConfirm = (product: Product) => {
    const isConfirmed = window.confirm(`"${product.title}" ürününü silmek istediğinize emin misiniz?`);
    
    if (isConfirmed) {
      // 1. Önce silme işlemini yap (React ekrandan kaldırsın)
      onDelete(product.id);

      // 2. Ekran güncellendikten hemen sonra pop-up göster
      setTimeout(() => {
        window.alert(`"${product.title}" ürünü başarıyla silindi!`);
      }, 100);
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white p-8 text-center rounded-2xl border border-slate-200 text-slate-500">
        <Box className="w-12 h-12 mx-auto mb-2 text-slate-300" />
        Henüz stokta ürün bulunmuyor.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {products.map((item) => (
        <div
          key={item.id}
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
                {item.category}
              </span>
              <span className="text-xs text-slate-400">ID: #{item.id}</span>
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1">{item.title}</h3>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <div>
              <div className="text-lg font-extrabold text-slate-900">₺{item.price}</div>
              <div className={`text-xs font-medium ${item.stock < 10 ? 'text-rose-500' : 'text-emerald-600'}`}>
                Stok: {item.stock} adet
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(item)}
                className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                title="Ürünü Düzenle"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDeleteConfirm(item)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Ürünü Sil"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};