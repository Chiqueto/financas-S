import React from "react";
import Login from "../views/login";
import CadastroUsuarios from "../views/cadastroUsuarios";
import Home from "../views/home";
import ConsultaLancamentos from "../views/lancamentos/consultaLancamentos";

import { Route, Switch, HashRouter, Redirect } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import DetalheLancamento from "../views/lancamentos/detalheLancamento";

function Routes() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <PrivateRoute path="/home" render={() => <Home />} />
        <Route path="/cadastro-usuarios" component={CadastroUsuarios} />

        <PrivateRoute
          path="/consulta-lancamentos"
          render={() => <ConsultaLancamentos />}
        />
        <PrivateRoute
          path="/cadastro-lancamento"
          render={(props) => <DetalheLancamento {...props} isCadastro={true} />}
        />
        <PrivateRoute
          path="/edita-lancamento/:id"
          render={(props) => (
            <DetalheLancamento {...props} isCadastro={false} />
          )}
        />
        <Redirect from="/" to="/login" />
      </Switch>
    </HashRouter>
  );
}

export default Routes;
