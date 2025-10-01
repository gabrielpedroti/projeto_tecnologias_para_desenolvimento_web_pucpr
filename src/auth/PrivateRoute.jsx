// src/auth/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export default function PrivateRoute(){
  const { user, loading } = useAuth();
  if (loading) return <p style={{textAlign:'center'}}>Carregando...</p>;
  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
