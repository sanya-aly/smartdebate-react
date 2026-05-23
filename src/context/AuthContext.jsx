// ============================================
// SMARTDEBATE - AUTH CONTEXT
// src/context/AuthContext.jsx
// ============================================

import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config";
import { getUserFromFirestore } from "../firebase/userService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState("user");
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const result = await getUserFromFirestore(user.uid);
        if (result.success) {
          setUserRole(result.data.role || "user");
          setUserData(result.data);
        } else {
          setUserRole("user");
          setUserData(null);
        }
      } else {
        setUserRole("user");
        setUserData(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const isAdmin = userRole === "admin";

  return (
    <AuthContext.Provider value={{ currentUser, userRole, isAdmin, userData, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);