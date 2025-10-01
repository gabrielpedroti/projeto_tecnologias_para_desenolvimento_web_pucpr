import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Principal(){
  const { user, logout } = useAuth();
  const [dados, setDados] = useState(null);
  const [msg, setMsg] = useState("");

  useEffect(()=>{
    async function load(){
      if(!user) return;
      try{
        const ref = doc(db,"usuarios",user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setDados(snap.data());
        } else {
          // cria perfil mínimo se não existir (evita “permission-denied” por regras diferentes)
          const base = { uid:user.uid, email:user.email, nome:"", sobrenome:"", dataNascimento:"", criadoEm:new Date().toISOString() };
          await setDoc(ref, base);
          setDados(base);
        }
      }catch(err){
        setMsg("Erro ao carregar dados: " + (err?.code || "tente novamente"));
      }
    }
    load();
  }, [user]);

  if(!user) return null;

  return (
    <div className="container"><div className="card">
      <h1>Página Principal</h1>
      {dados ? (
        <>
          <p><strong>Nome:</strong> {dados.nome || "-"}</p>
          <p><strong>Sobrenome:</strong> {dados.sobrenome || "-"}</p>
          <p><strong>Data de nascimento:</strong> {dados.dataNascimento || "-"}</p>
        </>
      ) : <p>{msg || "Carregando..."}</p>}
      <button className="btn" style={{marginTop:12}} onClick={logout}>Sair</button>
    </div></div>
  );
}
