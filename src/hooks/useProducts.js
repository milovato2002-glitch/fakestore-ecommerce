import { useQuery } from '@tanstack/react-query';

const BASE = 'https://fakestoreapi.com';

export const useAllProducts = () =>
  useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await fetch(`${BASE}/products`);
      return res.json();
    },
  });

export const useCategories = () =>
  useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const res = await fetch(`${BASE}/products/categories`);
      return res.json();
    },
  });

export const useProductsByCategory = (category) =>
  useQuery({
    queryKey: ['products', category],
    queryFn: async () => {
      const res = await fetch(`${BASE}/products/category/${category}`);
      return res.json();
    },
    enabled: !!category,
  });
