import React from "react";
import UsuarioService from "../app/services/usuarioService.js";
import LocalStorageService from "../app/services/localstorageService.js";

class Home extends React.Component {
  state = {
    saldo: 0,
  };

  constructor() {
    super();
    this.usuarioService = new UsuarioService();
  }

  componentDidMount() {
    const usuarioLogadoString =
      LocalStorageService.obterItem("_usuario_logado");
    const usuarioLogado = JSON.parse(usuarioLogadoString);

    this.usuarioService
      .obterSaldoPorUsuario(usuarioLogado.id)
      .then((response) => {
        this.setState({ saldo: response.data });
      })
      .catch((error) => {
        console.error(error.response);
      });
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron">
          <h1 className="display-3">Bem vindo!</h1>
          <p className="lead">Esse é seu sistema de finanças.</p>
          <p className="lead">
            Seu saldo para o mês atual é de R$ {this.state.saldo}
          </p>
        </div>
      </div>
    );
  }
}

export default Home;
