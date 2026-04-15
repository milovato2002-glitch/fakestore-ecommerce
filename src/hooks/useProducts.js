import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { db } from '../firebase/config';
import {
  collection, getDocs, addDoc, updateDoc, deleteDoc, doc
} from 'firebase/firestore';

export const useFirestoreProducts = () =>
  useQuery({
    queryKey: ['firestoreProducts'],
    queryFn: async () => {
      const snapshot = await getDocs(collection(db, 'products'));
      return snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    },
  });

export const useAddProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product) => {
      const docRef = await addDoc(collection(db, 'products'), product);
      return docRef.id;
    },
    onSuccess: () => queryClient.invalidateQueries(['firestoreProducts']),
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, updates }) => {
      await updateDoc(doc(db, 'products', id), updates);
    },
    onSuccess: () => queryClient.invalidateQueries(['firestoreProducts']),
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      await deleteDoc(doc(db, 'products', id));
    },
    onSuccess: () => queryClient.invalidateQueries(['firestoreProducts']),
  });
};
