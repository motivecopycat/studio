// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCHaNnkWhDHPo4Rrm_7cEjlO7G1zhuLPxU",
  authDomain: "kikasite-251f4.firebaseapp.com",
  projectId: "kikasite-251f4",
  storageBucket: "kikasite-251f4.appspot.com",
  messagingSenderId: "1061899209288",
  appId: "1:1061899209288:web:8630fb47b7b3ded399667d",
  measurementId: "G-5FR0E8HTDG",
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
