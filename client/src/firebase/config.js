// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBqzq1z3woCt1kavIx5msZHafHnyBqlc_o",
  authDomain: "couchcompass-579b0.firebaseapp.com",
  projectId: "couchcompass-579b0",
  storageBucket: "couchcompass-579b0.firebasestorage.app",
  messagingSenderId: "403586126658",
  appId: "1:403586126658:web:31f0d709444b030053eedb",
  measurementId: "G-YYMD121GTF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();