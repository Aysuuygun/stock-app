import axios from 'axios';
import type { Product } from '../types/product';

const categoryMap: Record<string, string> = {
  beauty: 'Güzellik',
  fragrances: 'Parfüm',
  furniture: 'Mobilya',
  groceries: 'Market',
};

export const fetchApiProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('https://dummyjson.com/products?limit=8');
    return response.data.products.map((item: any) => ({
      id: item.id,
      title: item.title,
      price: item.price,
      category: categoryMap[item.category] || item.category,
      stock: item.stock || 15,
      description: item.description,
    }));
  } catch (error) {
    console.error('API Veri çekme hatası:', error);
    return [];
  }
};