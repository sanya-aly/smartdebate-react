// ============================================
// SMARTDEBATE - FIRESTORE SERVICE
// src/firebase/firestoreService.js
// All Firestore CRUD Operations
// ============================================

import {
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "./config";

// Collection name
const COLLECTION = "debates";

// ============================================
// CREATE - Add new debate to Firestore
// ============================================
export const createDebate = async (debateData) => {
  try {
    const docRef = await addDoc(collection(db, COLLECTION), {
      ...debateData,
      createdAt: serverTimestamp(),
    });
    return { id: docRef.id, ...debateData };
  } catch (error) {
    console.error("Error adding debate:", error);
    throw error;
  }
};

// ============================================
// READ ALL - Get all debates from Firestore
// ============================================
export const getAllDebates = async () => {
  try {
    const snapshot = await getDocs(collection(db, COLLECTION));
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,  // ← Firestore ID se override karo — number wala hata do
    }));
  } catch (error) {
    console.error("Error getting debates:", error);
    throw error;
  }
};

// ============================================
// READ ONE - Get single debate by ID
// ============================================
export const getDebateById = async (id) => {
  try {
    const docRef = doc(db, COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Firestore ID se override karo — number wala id field replace ho jaye
      return { ...docSnap.data(), id: docSnap.id };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting debate:", error);
    throw error;
  }
};

// ============================================
// UPDATE - Update existing debate
// ============================================
export const updateDebate = async (id, updatedData) => {
  try {
    const docRef = doc(db, COLLECTION, id);
    await updateDoc(docRef, {
      ...updatedData,
      updatedAt: serverTimestamp(),
    });
    return { id, ...updatedData };
  } catch (error) {
    console.error("Error updating debate:", error);
    throw error;
  }
};

// ============================================
// DELETE - Delete debate by ID
// ============================================
export const deleteDebate = async (id) => {
  try {
    const docRef = doc(db, COLLECTION, id);
    await deleteDoc(docRef);
    return id;
  } catch (error) {
    console.error("Error deleting debate:", error);
    throw error;
  }
};

// ============================================
// SEED - Upload initial data to Firestore
// ============================================
export const seedDebates = async (debatesArray) => {
  try {
    const promises = debatesArray.map((debate) => {
      // id field hata do — Firestore khud ID banayega
      const { id, ...debateWithoutId } = debate;
      return addDoc(collection(db, COLLECTION), {
        ...debateWithoutId,
        createdAt: serverTimestamp(),
      });
    });
    await Promise.all(promises);
    console.log("✅ Debates seeded successfully!");
  } catch (error) {
    console.error("Error seeding debates:", error);
    throw error;
  }
};