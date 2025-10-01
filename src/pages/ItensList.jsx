// src/pages/ItensList.jsx
import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function ItensList(){
  const [itens, setItens] = useState([]);
  const { user } = useAuth();

  useEffect(()=>{
    if(!user) return;
    const q = query(collection(db,"itens"), where("ownerUid","==", user.uid));
    const unsub = onSnapshot(q, snap=>{
      setItens(snap.docs.map(d=>({id:d.id, ...d.data()})));
    });
    return ()=>unsub();
  },[user]);

  async function handleDelete(id){
    if(!confirm("Excluir este item?")) return;
    await deleteDoc(doc(db,"itens",id));
  }

  return (
    <div className="container"><div className="card">
      <h1>Itens</h1>
      <div style={{display:'flex', gap:8, marginBottom:12}}>
        <Link className="btn" to="/itens/novo">Novo</Link>
      </div>
      {itens.length===0 ? <p>Nenhum item.</p> : (
        <ul>
          {itens.map(it=>(
            <li key={it.id} style={{display:'flex', gap:8, alignItems:'center'}}>
              <span style={{flex:1}}>{it.nome} — {it.categoria} — R$ {it.preco}</span>
              <Link className="btn" to={`/itens/${it.id}/editar`}>Editar</Link>
              <button className="btn" onClick={()=>handleDelete(it.id)}>Excluir</button>
            </li>
          ))}
        </ul>
      )}
    </div></div>
  );
}
