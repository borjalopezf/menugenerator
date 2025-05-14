// lib/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAllf1LSbRO856z4MfM5rc3oQxzzB9aaOM",
  authDomain: "menugenerator-75802.firebaseapp.com",
  projectId: "menugenerator-75802",
  storageBucket: "menugenerator-75802.appspot.com",
  messagingSenderId: "270340227973",
  appId: "1:270340227973:web:669bf40830b7edbc20faec"
};

// Inicializar Firebase solo una vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };


