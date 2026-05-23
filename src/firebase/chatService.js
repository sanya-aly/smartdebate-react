// ============================================
// SMARTDEBATE - CHAT SERVICE
// src/firebase/chatService.js
// ============================================

import {
  collection, addDoc, query, orderBy,
  onSnapshot, serverTimestamp, doc, setDoc, getDoc,
} from "firebase/firestore";
import { db } from "./config";

// Generate consistent chat ID for 2 users
export const getChatId = (uid1, uid2) => [uid1, uid2].sort().join("_");

// Send message
export const sendMessage = async (chatId, message, sender) => {
  try {
    const chatRef = doc(db, "chats", chatId);
    const chatSnap = await getDoc(chatRef);
    if (!chatSnap.exists()) {
      await setDoc(chatRef, {
        createdAt: serverTimestamp(),
        participants: chatId.split("_"),
      });
    }
    await addDoc(collection(db, "chats", chatId, "messages"), {
      text: message,
      senderUid: sender.uid,
      senderName: sender.displayName || sender.email?.split("@")[0],
      createdAt: serverTimestamp(),
    });
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// Listen to messages (real-time)
export const listenToMessages = (chatId, callback) => {
  const q = query(
    collection(db, "chats", chatId, "messages"),
    orderBy("createdAt", "asc")
  );
  return onSnapshot(q, (snapshot) => {
    callback(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
};