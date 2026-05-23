// ============================================
// SMARTDEBATE - USER SERVICE
// src/firebase/userService.js
// ============================================

import {
  doc, setDoc, getDoc, getDocs,
  collection, updateDoc, serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

const USERS = "users";

// Save user to Firestore (no duplicates)
export const saveUserToFirestore = async (user, role = "user") => {
  try {
    const userRef = doc(db, USERS, user.uid);
    const userSnap = await getDoc(userRef);
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        name: user.displayName || "User",
        email: user.email,
        role: role,
        photoURL: user.photoURL || "",
        createdAt: serverTimestamp(),
        lastLogin: serverTimestamp(),
      });
    } else {
      await updateDoc(userRef, { lastLogin: serverTimestamp() });
    }
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get single user
export const getUserFromFirestore = async (uid) => {
  try {
    const userSnap = await getDoc(doc(db, USERS, uid));
    if (userSnap.exists()) return { success: true, data: userSnap.data() };
    return { success: false };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Get all users
export const getAllUsers = async () => {
  try {
    const snapshot = await getDocs(collection(db, USERS));
    return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
  } catch (error) {
    return [];
  }
};

// Get other users (for chat)
export const getOtherUsers = async (currentUid) => {
  try {
    const snapshot = await getDocs(collection(db, USERS));
    return snapshot.docs
      .map((d) => ({ id: d.id, ...d.data() }))
      .filter((u) => u.uid !== currentUid);
  } catch (error) {
    return [];
  }
};

// Update user role
export const updateUserRole = async (uid, newRole) => {
  try {
    await updateDoc(doc(db, USERS, uid), { role: newRole });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};