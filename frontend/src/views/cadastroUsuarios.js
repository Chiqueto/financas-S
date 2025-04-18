import React from "react";
import Card from "../components/card";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import FormGroup from "../components/formGroup";

import UsuarioService from "../app/services/usuarioService";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

class CadastroUsuarios extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
  };

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  validar() {
    const msgs = [];
    if (!this.state.nome) {
      msgs.push("O campo Nome é obrigatório.");
    }
    if (!this.state.email) {
      msgs.push("O campo Email é obrigatório.");
    } else if (!this.state.email.match(/^[a-z0-9.]+@[a-z0-9]+\.[a-z]/)) {
      msgs.push("Informe um Email válido.");
    }
    if (!this.state.senha || !this.state.senhaRepeticao) {
      msgs.push("Digite a senha 2x.");
    } else if (this.state.senha !== this.state.senhaRepeticao) {
      msgs.push("As senhas não batem.");
    }
    return msgs;
  }

  cadastrar = () => {
    const msgs = this.validar();

    if (msgs && msgs.length > 0) {
      msgs.forEach((msg, index) => {
        mensagemErro(msg);
      });
      return false;
    }

    const usuario = {
      nome: this.state.nome,
      email: this.state.email,
      senha: this.state.senha,
    };

    this.service
      .salvar(usuario)
      .then((response) => {
        mensagemSucesso(
          "Usuário cadastrado com sucesso! Faça o login para acessar o sistema."
        );
        this.props.history.push("/login");
      })
      .catch((error) => {
        mensagemErro(error.response.data);
      });
  };

  cancelar = () => {
    this.props.history.push("/login");
  };

  render() {
    return (
      <div className="container">
        <Card title="Cadastro de usuários">
          <div className="row">
            <div className="col-lg-12">
              <div className="bs-component">
                <fieldset>
                  <FormGroup label="Nome: *" htmlFor="inputNome">
                    <input
                      type="text"
                      className="form-control"
                      id="inputNome"
                      placeholder="Digite o Nome"
                      name="nome"
                      onChange={(e) => this.setState({ nome: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup label="E-mail: *" htmlFor="inputEmail">
                    <input
                      type="email"
                      className="form-control"
                      id="inputEmail"
                      placeholder="Digite o Email"
                      name="email"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup label="Senha: *" htmlFor="inputSenha">
                    <input
                      type="password"
                      className="form-control"
                      id="inputSenha"
                      placeholder="Digite a Senha"
                      name="senha"
                      onChange={(e) => this.setState({ senha: e.target.value })}
                    />
                  </FormGroup>
                  <FormGroup
                    label="Repita a senha: *"
                    htmlFor="inputRepitaSenha"
                  >
                    <input
                      type="password"
                      className="form-control"
                      id="inputRepitaSenha"
                      placeholder="Digite a Senha novamente"
                      name="senhaRepeticao"
                      onChange={(e) =>
                        this.setState({ senhaRepeticao: e.target.value })
                      }
                    />
                  </FormGroup>
                </fieldset>
                <button
                  onClick={this.cadastrar}
                  type="button"
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.cancelar}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(CadastroUsuarios);
