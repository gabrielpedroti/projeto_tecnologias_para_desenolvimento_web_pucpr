// src/routes.jsx
import { Routes, Route, Navigate } from "react-router-dom";


import Cadastro from "./pages/Cadastro";
import Login from "./pages/Login";
import Principal from "./pages/Principal";
import ItensList from "./pages/ItensList";
import ItemForm from "./pages/ItemForm";

// Rota privada
import PrivateRoute from "./auth/PrivateRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redireciona raiz para /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Públicas */}
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/login" element={<Login />} />

      {/* Protegidas: só acessa logado */}
      <Route element={<PrivateRoute />}>
        <Route path="/principal" element={<Principal />} />

        {/* Itens (opcionais, mas úteis) */}
        <Route path="/itens" element={<ItensList />} />
        <Route path="/itens/novo" element={<ItemForm />} />
        <Route path="/itens/:id/editar" element={<ItemForm />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
