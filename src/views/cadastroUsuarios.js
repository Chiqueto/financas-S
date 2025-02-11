import React from "react";
import Card from "../components/card";
import FormGroup from "../components/form-group";

class CadastroUsuarios extends React.Component {
  state = {
    nome: "",
    email: "",
    senha: "",
    senhaRepeticao: "",
  };

  cadastrar = () => {
    console.log("Nome: ", this.state.nome);
    console.log("Email: ", this.state.email);
    console.log("Senha: ", this.state.senha);
    console.log("Senha Repetição: ", this.state.senhaRepeticao);
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
                <button type="button" className="btn btn-danger">
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

export default CadastroUsuarios;
