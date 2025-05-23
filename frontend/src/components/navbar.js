import React, { useContext } from "react";
import NavbarItem from "./navbarItem";
import LocalStorageService from "../app/services/localstorageService";
import AuthContext from "../app/services/authContext";

function Navbar() {
  const { isAutenticado, encerrarSessao } = useContext(AuthContext);

  function handleLogout() {
    encerrarSessao();
  }

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
      <div className="container-fluid">
        <a href="#/" className="navbar-brand">
          Minhas finanças
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        {isAutenticado && (
          <div className="collapse navbar-collapse" id="navbarColor01">
            <ul className="navbar-nav me-auto ">
              <NavbarItem href="#/home" label="Home" />
              {/* <NavbarItem href="#/cadastro-usuarios" label="Usuários" /> */}
              <NavbarItem href="#/consulta-lancamentos" label="Lançamentos" />
              <NavbarItem href="#/login" label="Sair" logout={handleLogout} />
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
