// ============================================
// SMARTDEBATE - ADMIN ROUTE GUARD
// src/components/AdminRoute.jsx
// ============================================

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();

  if (!currentUser) return <Navigate to="/auth/login" replace />;
  if (!isAdmin) return <Navigate to="/user/dashboard" replace />;

  return children;
};

export default AdminRoute;