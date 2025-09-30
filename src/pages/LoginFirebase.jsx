import { useState } from 'react';

export default function LoginFirebase() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [msg, setMsg] = useState('');

  return (
    <div className="container">
      <div className="card">
        <h1>Login (Firebase)</h1>
        <form onSubmit={(e)=>e.preventDefault()}>
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
        <p className="mensagem">{msg}</p>
      </div>
    </div>
  );
}
