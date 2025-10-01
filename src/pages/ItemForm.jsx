// src/pages/ItemForm.jsx
import { useEffect, useState } from "react";
import { addDoc, collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ItemForm(){
  const { id } = useParams(); const navigate = useNavigate();
  const { user } = useAuth();
  const [form, setForm] = useState({ nome:"", categoria:"", preco:"" });
  const [msg, setMsg] = useState("");

  useEffect(()=>{ (async()=>{
    if(!id) return;
    const snap = await getDoc(doc(db,"itens",id));
    if (snap.exists()) setForm(snap.data());
    else setMsg("Item não encontrado.");
  })(); },[id]);

  function onChange(e){ const {name,value} = e.target; setForm(p=>({...p,[name]:value})); }

  async function onSubmit(e){
    e.preventDefault(); setMsg("");
    try{
      if(id){
        await updateDoc(doc(db,"itens",id), form);
        setMsg("Item atualizado!");
      }else{
        await addDoc(collection(db,"itens"), { ...form, ownerUid: user.uid });
        setMsg("Item criado!");
      }
      setTimeout(()=> navigate("/itens"), 600);
    }catch(err){
      setMsg("Erro ao salvar: " + (err?.code || "tente novamente"));
    }
  }

  return (
    <div className="container"><div className="card">
      <h1>{id ? "Editar Item" : "Novo Item"}</h1>
      <form onSubmit={onSubmit}>
        <div className="field"><label>Nome</label>
          <input name="nome" value={form.nome} onChange={onChange} required/></div>
        <div className="field"><label>Categoria</label>
          <input name="categoria" value={form.categoria} onChange={onChange} required/></div>
        <div className="field"><label>Preço</label>
          <input name="preco" type="number" step="0.01" value={form.preco} onChange={onChange} required/></div>
        <button className="btn" type="submit">{id ? "Salvar" : "Criar"}</button>
      </form>
      <p className="mensagem">{msg}</p>
    </div></div>
  );
}
