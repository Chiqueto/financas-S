import React from "react";
import Login from "../views/login";
import CadastroUsuarios from "../views/cadastroUsuarios";
import Home from "../views/home";

import { Route, Switch, HashRouter } from "react-router-dom";
//HashRouter - usado para criar rotas de navegação e separar cliente e servidor pelo # na URL
function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/cadastro-usuarios" component={CadastroUsuarios} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
