import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const env = import.meta.env;

// Firebase web config is public by design — it identifies the project, it does not grant access. Access is enforced by Firestore Security Rules (see /firestore.rules) and Auth authorized domains. https://firebase.google.com/docs/projects/api-keys
const firebaseConfig = {
  apiKey: env.VITE_FIREBASE_API_KEY || "AIzaSyDmK7CpdmsKCSj0-JEQXeNR78sy1SEMNAg",
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN || "datexia-lurnex-lms.firebaseapp.com",
  projectId: env.VITE_FIREBASE_PROJECT_ID || "datexia-lurnex-lms",
  storageBucket: env.VITE_FIREBASE_STORAGE_BUCKET || "datexia-lurnex-lms.firebasestorage.app",
  messagingSenderId: env.VITE_FIREBASE_MESSAGING_SENDER_ID || "642100250858",
  appId: env.VITE_FIREBASE_APP_ID || "1:642100250858:web:4a39556431eb572b8baf93",
  measurementId: env.VITE_FIREBASE_MEASUREMENT_ID || "G-K5TWLN8RF9",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
