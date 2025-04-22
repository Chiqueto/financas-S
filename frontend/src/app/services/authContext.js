import React, { createContext } from "react";

const AuthContext = createContext({
  usuarioAutenticado: null,
  isAutenticado: false,
  iniciarSessao: () => {},
  encerrarSessao: () => {},
});

export class AuthProvider extends React.Component {
  state = {
    usuarioAutenticado: JSON.parse(localStorage.getItem("_usuario_logado")),
    isAutenticado: !!localStorage.getItem("_usuario_logado"),
  };

  iniciarSessao = (usuario) => {
    localStorage.setItem("_usuario_logado", JSON.stringify(usuario));
    this.setState({ usuarioAutenticado: usuario, isAutenticado: true });
  };

  encerrarSessao = () => {
    localStorage.removeItem("_usuario_logado");
    this.setState({ usuarioAutenticado: null, isAutenticado: false });
  };

  render() {
    const contexto = {
      usuarioAutenticado: this.state.usuarioAutenticado,
      isAutenticado: this.state.isAutenticado,
      iniciarSessao: this.iniciarSessao,
      encerrarSessao: this.encerrarSessao,
    };

    return (
      <AuthContext.Provider value={contexto}>
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}

export default AuthContext;
