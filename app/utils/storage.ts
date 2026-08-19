import type { Product } from '../types/product';

const STORAGE_KEY = 'stok_takip_urunler';

export const getStoredProducts = (): Product[] | null => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveStoredProducts = (products: Product[]): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
};