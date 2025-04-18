import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/formGroup";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/services/lancamentoService";
import LocalStorageService from "../../app/services/localstorageService";
import * as messages from "../../components/toastr";

class ConsultaLancamentos extends React.Component {
  state = {
    ano: "",
    mes: "",
    tipo: "",
    lancamentos: [],
  };

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  buscar = () => {
    const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");
    const lancamentoFiltro = {
      ano: this.state.ano,
      mes: this.state.mes,
      tipo: this.state.tipo,
      usuario: usuarioLogado.id,
    };

    this.service
      .consultar(lancamentoFiltro)
      .then((response) => {
        const lista = response.data;
        if (response.data.length < 1) {
          messages.mensagemAlerta("Nenhum resultado encontrado!", "info");
        } else {
          this.setState({ lancamentos: lista });
        }
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu um erro ao buscar os lançamentos!");
      });
  };

  render() {
    const meses = [
      { label: "Selecione...", value: "" },
      { label: "Janeiro", value: 1 },
      { label: "Fevereiro", value: 2 },
      { label: "Março", value: 3 },
      { label: "Abril", value: 4 },
      { label: "Maio", value: 5 },
      { label: "Junho", value: 6 },
      { label: "Julho", value: 7 },
      { label: "Agosto", value: 8 },
      { label: "Setembro", value: 9 },
      { label: "Outubro", value: 10 },
      { label: "Novembro", value: 11 },
      { label: "Dezembro", value: 12 },
    ];

    const tipos = [
      { label: "Selecione...", value: "" },
      { label: "Despesa", value: "DESPESA" },
      { label: "Receita", value: "RECEITA" },
    ];

    return (
      <div className="container">
        <Card title="Consulta Lançamentos">
          <div className="row">
            <div className="col-md-12">
              <div className="bs-component">
                <FormGroup htmlFor="inputAno" label="Ano: *">
                  <input
                    type="text"
                    className="form-control"
                    id="inputAno"
                    value={this.state.ano}
                    onChange={(e) => this.setState({ ano: e.target.value })}
                    placeholder="Digite o Ano"
                  />
                </FormGroup>

                <FormGroup htmlFor="inputMes" label="Mês: ">
                  <SelectMenu
                    id="inputMes"
                    className="form-control"
                    value={this.state.mes}
                    onChange={(e) => this.setState({ mes: e.target.value })}
                    lista={meses}
                  />
                </FormGroup>

                <FormGroup htmlFor="inputTipo" label="Tipo Lançamento: ">
                  <SelectMenu
                    id="inputTipo"
                    className="form-control"
                    value={this.state.tipo}
                    onChange={(e) => this.setState({ tipo: e.target.value })}
                    lista={tipos}
                  />
                </FormGroup>

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.buscar}
                >
                  <i className="pi pi-search pr-2"></i>
                  Buscar
                </button>
                <button type="button" className="btn btn-danger ">
                  <i className="pi pi-plus pr-2"></i>
                  Cadastrar
                </button>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div class="col-md-12">
              <LancamentosTable lancamentos={this.state.lancamentos} />
            </div>
          </div>
        </Card>
      </div>
    );
  }
}

export default withRouter(ConsultaLancamentos);
