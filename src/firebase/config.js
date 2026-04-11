// ============================================
// SMARTDEBATE - FIREBASE CONFIG
// src/firebase/config.js
// ============================================
// ⚠️ IMPORTANT: Replace all placeholder values
// with your REAL Firebase project credentials
// from https://console.firebase.google.com
// ============================================

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBvraSzb3XOOEfbgGVKQBOauYKQ7JZm99Q",
  authDomain: "smartdebate-9f679.firebaseapp.com",
  projectId: "smartdebate-9f679",
  storageBucket: "smartdebate-9f679.firebasestorage.app",
  messagingSenderId: "75921869120",
  appId: "1:75921869120:web:0b6ebbcebf8dee0bea52a5",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
