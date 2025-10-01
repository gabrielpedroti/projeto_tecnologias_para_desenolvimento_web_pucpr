import { Link } from "react-router-dom";
import AppRoutes from "./routes";
import "./index.css";

export default function App() {
  return (
    <>
      <nav style={{display:'flex', gap:12, padding:12, justifyContent:'center'}}>
        <Link to="/cadastro">Cadastro</Link>
        <Link to="/login">Login</Link>
        <Link to="/principal">Principal</Link>
        <Link to="/itens">Itens</Link>
        <Link to="/itens/novo">Novo Item</Link>
      </nav>
      <AppRoutes />
    </>
  );
}
