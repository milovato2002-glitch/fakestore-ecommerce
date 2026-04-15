import { db } from '../firebase/config';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const seedProducts = async () => {
  const existing = await getDocs(collection(db, 'products'));
  if (!existing.empty) return;
  const res = await fetch('https://fakestoreapi.com/products');
  const products = await res.json();
  for (const product of products) {
    await addDoc(collection(db, 'products'), {
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      rating: product.rating,
    });
  }
};
