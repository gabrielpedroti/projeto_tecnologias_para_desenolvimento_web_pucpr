// src/App.jsx (trecho principal)
import { Routes, Route, Link } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute.jsx";
import Home from "./pages/Home";
import LoginFirebase from "./pages/LoginFirebase";
import ItensList from "./pages/ItensList";
import ItemForm from "./pages/ItemForm";
import "./index.css";

export default function App() {
  return (
    <>
      <nav style={{display:'flex', gap:12, padding:12, justifyContent:'center'}}>
        <Link to="/">Home</Link>
        <Link to="/itens">Itens</Link>
        <Link to="/itens/novo">Novo Item</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginFirebase />} />

        {/* Tudo abaixo só abre se estiver logado */}
        <Route element={<PrivateRoute />}>
          <Route path="/itens" element={<ItensList />} />
          <Route path="/itens/novo" element={<ItemForm />} />
          <Route path="/itens/:id/editar" element={<ItemForm />} />
        </Route>
      </Routes>
    </>
  );
}
