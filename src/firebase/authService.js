// ============================================
// SMARTDEBATE - FIREBASE AUTH SERVICE
// src/firebase/authService.js
// All Firebase Authentication Functions
// ============================================

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { auth } from "./config";

// Google Provider
const googleProvider = new GoogleAuthProvider();

// ============================================
// 1. CREATE USER - Email & Password
// ============================================
export const registerWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    // Update display name after registration
    await updateProfile(userCredential.user, { displayName });
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// 2. SIGN IN - Email & Password
// ============================================
export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// 3. SIGN OUT
// ============================================
export const logout = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// 4. FORGOT PASSWORD - Send Reset Email
// ============================================
export const forgotPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// 5. RESET PASSWORD (Update Password)
// Uses reauthentication before update
// ============================================
export const resetPassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "No user logged in!" };

    // Reauthenticate first
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);

    // Update password
    const { updatePassword } = await import("firebase/auth");
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// 6. UPDATE PROFILE - Name & Photo
// ============================================
export const updateUserProfile = async (displayName, photoURL = null) => {
  try {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "No user logged in!" };

    const updates = { displayName };
    if (photoURL) updates.photoURL = photoURL;

    await updateProfile(user, updates);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// 7. DELETE USER - Remove Account
// ============================================
export const deleteUserAccount = async (password) => {
  try {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "No user logged in!" };

    // Reauthenticate before delete
    const credential = EmailAuthProvider.credential(user.email, password);
    await reauthenticateWithCredential(user, credential);

    await deleteUser(user);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// 8. GOOGLE SIGN IN
// ============================================
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// GET CURRENT USER
// ============================================
export const getCurrentUser = () => auth.currentUser;