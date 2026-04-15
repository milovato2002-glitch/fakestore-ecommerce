import { db } from '../firebase/config';
import {
  collection, addDoc, query, where, getDocs, doc, getDoc, serverTimestamp
} from 'firebase/firestore';

export const placeOrder = async (userId, items, totalPrice) => {
  const order = {
    userId,
    items,
    totalPrice,
    createdAt: serverTimestamp(),
  };
  const docRef = await addDoc(collection(db, 'orders'), order);
  return docRef.id;
};

export const getUserOrders = async (userId) => {
  const q = query(collection(db, 'orders'), where('userId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getOrderById = async (orderId) => {
  const docRef = doc(db, 'orders', orderId);
  const snapshot = await getDoc(docRef);
  if (snapshot.exists()) {
    return { id: snapshot.id, ...snapshot.data() };
  }
  return null;
};
