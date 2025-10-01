import { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuth } from '../auth/AuthProvider';

export default function LoginFirebase() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e){
    e.preventDefault();
    setMsg('');
    try{
      await signInWithEmailAndPassword(auth, email, senha);
      setMsg('Login realizado com sucesso!');
      navigate('/itens');
    }catch(err){
      setMsg('Usuário ou senha incorretos!');
    }
  }

  async function handleCadastro(){
    setMsg('');
    try{
      await createUserWithEmailAndPassword(auth, email, senha);
      setMsg('Usuário cadastrado! Agora você já pode acessar.');
    }catch(err){
      setMsg('Erro ao cadastrar: ' + (err?.code || 'verifique os dados'));
    }
  }

  if (user) return <p style={{textAlign:'center'}}>Você já está logado.</p>;

  return (
    <div className="container">
      <div className="card">
        <h1>Login (Firebase)</h1>
        <form onSubmit={handleLogin}>
          <div className="field">
            <label>E-mail</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div className="field">
            <label>Senha</label>
            <input type="password" value={senha} onChange={e=>setSenha(e.target.value)} required />
          </div>
          <button className="btn" type="submit">Entrar</button>
        </form>
        <button className="btn" style={{marginTop:8}} onClick={handleCadastro}>Criar conta</button>
        <p className="mensagem">{msg}</p>
      </div>
    </div>
  );
}
