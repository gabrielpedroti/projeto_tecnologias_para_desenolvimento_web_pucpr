import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, (u)=>{
      setUser(u || null);
      setLoading(false);
    });
    return () => unsub();
  },[]);

  const logout = () => signOut(auth);

  return (
    <AuthCtx.Provider value={{ user, loading, logout }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth(){
  return useContext(AuthCtx);
}
