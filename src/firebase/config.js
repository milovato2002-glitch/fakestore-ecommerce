import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCWj1GQcubpWZERS_Q11AVqqm6qukr3qIk",
  authDomain: "fakestore-ecommerce-4d22b.firebaseapp.com",
  projectId: "fakestore-ecommerce-4d22b",
  storageBucket: "fakestore-ecommerce-4d22b.firebasestorage.app",
  messagingSenderId: "963775431609",
  appId: "1:963775431609:web:ac0dab7a8327a0ecd76c68",
  measurementId: "G-2PRXDJPNMS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
