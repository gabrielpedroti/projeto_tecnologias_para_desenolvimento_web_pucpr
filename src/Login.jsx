import React, { Component } from "react";
import InputField from "./components/InputField";

// Array com usuário válido
const USUARIOS = [
  { email: "gabriel.pedroti@pucpr.edu.br", senha: "vaiestudar" }
];

export default class Login extends Component {
  state = {
    email: "",
    senha: "",
    mensagem: ""
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, mensagem: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { email, senha } = this.state;

    const valido = USUARIOS.some(
      (u) => u.email === email && u.senha === senha && email.endsWith("@pucpr.edu.br")
    );

    if (valido) {
      this.setState({ mensagem: "Login realizado com sucesso!" });
    } else {
      this.setState({ mensagem: "Usuário ou senha incorretos!" });
    }
  };

  render() {
    const { email, senha, mensagem } = this.state;

    return (
      <div className="container">
        <div className="card">
          <h1>Login</h1>

          <form onSubmit={this.handleSubmit}>
            <InputField
              label="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={this.handleChange}
              placeholder="seu-email@pucpr.edu.br"
            />
            <InputField
              label="Senha"
              type="password"
              name="senha"
              value={senha}
              onChange={this.handleChange}
              placeholder="********"
            />
            <button type="submit" className="btn">Entrar</button>
          </form>

          <p className="mensagem">{mensagem}</p>
        </div>
      </div>
    );
  }
}
