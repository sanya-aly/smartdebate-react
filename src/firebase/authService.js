// ============================================
// SMARTDEBATE - AUTH SERVICE (Updated)
// src/firebase/authService.js
// Assignment 04 - Saves user to Firestore
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
  updatePassword,
} from "firebase/auth";
import { auth } from "./config";
import { saveUserToFirestore } from "./userService";

const googleProvider = new GoogleAuthProvider();

// ============================================
// 1. CREATE USER - Email & Password
// ============================================
export const registerWithEmail = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, { displayName });
    // Save to Firestore
    await saveUserToFirestore(
      { ...userCredential.user, displayName },
      "user"
    );
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
    // Update lastLogin
    await saveUserToFirestore(userCredential.user);
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
// 4. FORGOT PASSWORD
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
// 5. RESET PASSWORD
// ============================================
export const resetPassword = async (currentPassword, newPassword) => {
  try {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "No user logged in!" };
    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    await reauthenticateWithCredential(user, credential);
    await updatePassword(user, newPassword);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// 6. UPDATE PROFILE
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
// 7. DELETE USER
// ============================================
export const deleteUserAccount = async (password) => {
  try {
    const user = auth.currentUser;
    if (!user) return { success: false, error: "No user logged in!" };
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
    // Save to Firestore (no duplicate)
    await saveUserToFirestore(result.user, "user");
    return { success: true, user: result.user };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const getCurrentUser = () => auth.currentUser;