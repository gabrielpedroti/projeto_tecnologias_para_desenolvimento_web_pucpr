import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Login(){
  const [email, setEmail] = useState(""); const [senha, setSenha] = useState("");
  const [msg, setMsg] = useState(""); const navigate = useNavigate();

  async function onSubmit(e){
    e.preventDefault(); setMsg("");
    try{ await signInWithEmailAndPassword(auth, email, senha); navigate("/principal"); }
    catch{ setMsg("Usuário não está cadastrado ou senha inválida."); }
  }

  return (
    <div className="container"><div className="card">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <div className="field"><label>E-mail</label>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div className="field"><label>Senha</label>
          <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} required/></div>
        <button className="btn" type="submit">Acessar página Principal</button>
      </form>
      <p className="mensagem">{msg}</p>
    </div></div>
  );
}
