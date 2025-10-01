import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function Cadastro(){
  const [form, setForm] = useState({
    email: "", senha: "", nome: "", sobrenome: "", dataNascimento: ""
  });
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  function onChange(e){ const {name,value} = e.target; setForm(p=>({...p,[name]:value})); }

  async function onSubmit(e){
    e.preventDefault(); setMsg("");
    try{
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.senha);
      const uid = cred.user.uid;
      await setDoc(doc(db,"usuarios",uid), {
        uid, email: form.email, nome: form.nome, sobrenome: form.sobrenome,
        dataNascimento: form.dataNascimento, criadoEm: new Date().toISOString()
      });
      setMsg("Cadastro ok! Redirecionando…");
      setTimeout(()=> navigate("/principal"), 600);
    }catch(err){
      if (err?.code === "auth/email-already-in-use") {
        setMsg("E-mail já cadastrado. Faça login.");
      } else {
        setMsg("Erro ao cadastrar: " + (err?.code || "verifique os dados"));
      }
    }
  }

  return (
    <div className="container"><div className="card">
      <h1>Cadastro</h1>
      <form onSubmit={onSubmit}>
        <div className="field"><label>E-mail</label>
          <input type="email" name="email" value={form.email} onChange={onChange} required/></div>
        <div className="field"><label>Senha</label>
          <input type="password" name="senha" value={form.senha} onChange={onChange} required/></div>
        <div className="field"><label>Nome</label>
          <input name="nome" value={form.nome} onChange={onChange} required/></div>
        <div className="field"><label>Sobrenome</label>
          <input name="sobrenome" value={form.sobrenome} onChange={onChange} required/></div>
        <div className="field"><label>Data de nascimento</label>
          <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={onChange} required/></div>
        <button className="btn" type="submit">Cadastrar</button>
      </form>
      <p className="mensagem">{msg}</p>
    </div></div>
  );
}
