import React from "react";
import Card from "../components/card";
import FormGroup from "../components/formGroup.js";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import UsuarioService from "../app/services/usuarioService.js";
import LocalStorageService from "../app/services/localstorageService.js";
import { mensagemErro } from "../components/toastr.js";
import AuthContext from "../app/services/authContext.js";

class Login extends React.Component {
  static contextType = AuthContext;

  constructor() {
    super();
    this.service = new UsuarioService();
  }

  state = {
    email: "",
    senha: "",
  };

  prepareCadastrar = () => {
    this.props.history.push("/cadastro-usuarios");
  };

  entrar = () => {
    this.service
      .autenticar({
        email: this.state.email,
        senha: this.state.senha,
      })
      .then((response) => {
        this.context.iniciarSessao(response.data);
        this.props.history.push("/home");
      })
      .catch((erro) => {
        mensagemErro(erro.response.data);
      });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div
            className="col-md-6"
            style={{ position: "relative", left: "300px" }}
          >
            <div className="bs-docs-section">
              <Card title={"Login"}>
                {" "}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="bs-component">
                      <fieldset>
                        <FormGroup
                          label="E-mail: *"
                          htmlFor="exampleInputEmail"
                        >
                          <input
                            type="email"
                            className="form-control"
                            id="exampleInputEmail"
                            placeholder="Digite o E-mail"
                            value={this.state.email}
                            onChange={(e) =>
                              this.setState({ email: e.target.value })
                            }
                          />
                        </FormGroup>

                        <FormGroup
                          label="Senha: *"
                          htmlFor="exampleInputPassword"
                        >
                          <input
                            type="password"
                            className="form-control"
                            id="exampleInputPassword"
                            placeholder="Digite a Senha"
                            name="senha"
                            onChange={(e) =>
                              this.setState({ senha: e.target.value })
                            }
                          />
                        </FormGroup>
                        <button
                          type="button"
                          className="btn btn-success"
                          onClick={this.entrar}
                        >
                          Entrar
                        </button>
                        <button
                          onClick={this.prepareCadastrar}
                          type="button"
                          className="btn btn-info"
                        >
                          Registrar
                        </button>
                      </fieldset>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Login);
