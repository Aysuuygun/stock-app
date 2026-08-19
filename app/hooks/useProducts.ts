import { useState, useEffect } from 'react';
import type { Product } from '../types/product';
import { fetchApiProducts } from '../utils/api';
import { getStoredProducts, saveStoredProducts } from '../utils/storage';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const initData = async () => {
      const localData = getStoredProducts();
      if (localData && localData.length > 0) {
        setProducts(localData);
      } else {
        const apiData = await fetchApiProducts();
        setProducts(apiData);
        saveStoredProducts(apiData);
      }
      setLoading(false);
    };

    initData();
  }, []);

  const addProduct = (newProduct: Omit<Product, 'id'>) => {
    const created: Product = {
      ...newProduct,
      id: Date.now(),
    };
    const updated = [created, ...products];
    setProducts(updated);
    saveStoredProducts(updated);
  };

  // UPDATE (Güncelleme) İşlemi
  const updateProduct = (updatedProduct: Product) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const deleteProduct = (id: number) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    saveStoredProducts(updated);
  };

  const resetProducts = async () => {
    setLoading(true);
    const apiData = await fetchApiProducts();
    setProducts(apiData);
    saveStoredProducts(apiData);
    setLoading(false);
  };

  return {
    products,
    loading,
    addProduct,
    updateProduct,
    deleteProduct,
    resetProducts,
  };
};