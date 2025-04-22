import React from "react";
import FormGroup from "../../components/formGroup";
import SelectMenu from "../../components/selectMenu";
import Card from "../../components/card";
import LancamentoService from "../../app/services/lancamentoService";
import * as messages from "../../components/toastr";
import LocalStorageService from "../../app/services/localstorageService";

class DetalheLancamento extends React.Component {
  state = {
    descricao: "",
    mes: "",
    ano: "",
    tipo: "",
    valor: 0,
    status: "",
  };

  constructor() {
    super();
    this.service = new LancamentoService();
  }

  cadastrar = () => {
    const usuarioLogado = LocalStorageService.obterItem("_usuario_logado");

    const lancamento = {
      descricao: this.state.descricao,
      mes: this.state.mes,
      ano: this.state.ano,
      tipo: this.state.tipo,
      valor: this.state.valor,
      usuario: usuarioLogado.id,
    };

    this.service
      .cadastrar(lancamento)
      .then((response) => {
        messages.mensagemSucesso("Lançamento cadastrado com sucesso!");
        this.props.history.push("/consulta-lancamentos");
      })
      .catch((error) => {
        messages.mensagemErro("Erro ao cadastrar lançamento!");
      });
  };

  editar = () => {
    const lancamento = {
      descricao: this.state.descricao,
      mes: this.state.mes,
      ano: this.state.ano,
      tipo: this.state.tipo,
      valor: this.state.valor,
      status: this.state.status,
      usuario: LocalStorageService.obterItem("_usuario_logado").id,
    };

    console.log(lancamento);

    this.service
      .editar(lancamento, this.props.match.params.id)
      .then((response) => {
        messages.mensagemSucesso("Lançamento editado com sucesso!");
        this.props.history.push("/consulta-lancamentos");
      })
      .catch((error) => {
        messages.mensagemErro(
          "Erro ao editar lançamento!" + error.response.data.message
        );
      });
  };

  componentDidMount() {
    const params = this.props.match.params;
    if (params.id) {
      this.service
        .obterLancamentoPorId(params.id)
        .then((response) => {
          this.setState({
            descricao: response.data.descricao,
            mes: response.data.mes,
            ano: response.data.ano,
            tipo: response.data.tipo,
            valor: response.data.valor,
            status: response.data.status,
          });
        })
        .catch((error) => {
          messages.mensagemErro("Erro ao obter lançamento!");
        });
    }
  }

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

    const status = [
      { label: "Selecione...", value: "" },
      { label: "Efetivado", value: "EFETIVADO" },
      { label: "Cancelado", value: "CANCELADO" },
      { label: "Pendente", value: "PENDENTE" },
    ];

    return (
      <div className="container">
        <Card
          title={
            this.props.isCadastro
              ? "Cadastro de Lançamento"
              : "Edição de Lançamento"
          }
        >
          <div className="row">
            <div className="col-md-12">
              <div className="bs-component">
                <FormGroup htmlFor="inputDescricao" label="Descrição: *">
                  <input
                    type="text"
                    className="form-control"
                    id="inputDescricao"
                    value={this.state.descricao}
                    onChange={(e) =>
                      this.setState({ descricao: e.target.value })
                    }
                    placeholder="Digite a descrição"
                  />
                </FormGroup>
                <div className="row">
                  <div className="col-md-6">
                    <FormGroup htmlFor="inputAno" label="Ano: *">
                      <input
                        id="inputAno"
                        className="form-control"
                        value={this.state.ano}
                        onChange={(e) => this.setState({ ano: e.target.value })}
                      />
                    </FormGroup>
                  </div>
                  <div className="col-md-6">
                    <FormGroup htmlFor="inputMes" label="Mês: *">
                      <SelectMenu
                        id="inputMes"
                        className="form-control"
                        value={this.state.mes}
                        onChange={(e) => this.setState({ mes: e.target.value })}
                        lista={meses}
                      />
                    </FormGroup>
                  </div>
                </div>

                {this.props.isCadastro ? (
                  <div className="row">
                    <div className="col-md-6">
                      <FormGroup htmlFor="inputValor" label="Valor: *">
                        <input
                          id="inputValor"
                          className="form-control"
                          value={this.state.valor}
                          onChange={(e) =>
                            this.setState({ valor: e.target.value })
                          }
                          placeholder="Digite o valor"
                          type="number"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-6">
                      <FormGroup htmlFor="inputTipo" label="Tipo: *">
                        <SelectMenu
                          id="inputTipo"
                          className="form-control"
                          value={this.state.tipo}
                          onChange={(e) =>
                            this.setState({ tipo: e.target.value })
                          }
                          lista={tipos}
                        />
                      </FormGroup>
                    </div>
                  </div>
                ) : (
                  <div className="row">
                    <div className="col-md-4">
                      <FormGroup htmlFor="inputValor" label="Valor: *">
                        <input
                          id="inputValor"
                          className="form-control"
                          value={this.state.valor}
                          onChange={(e) =>
                            this.setState({ valor: e.target.value })
                          }
                          placeholder="Digite o valor"
                          type="number"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-4">
                      <FormGroup htmlFor="inputTipo" label="Tipo: *">
                        <SelectMenu
                          id="inputTipo"
                          className="form-control"
                          value={this.state.tipo}
                          onChange={(e) =>
                            this.setState({ tipo: e.target.value })
                          }
                          lista={tipos}
                        />
                      </FormGroup>
                    </div>
                    <div className="col-md-4">
                      <FormGroup htmlFor="inputStatus" label="Status: *">
                        <SelectMenu
                          id="inputStatus"
                          className="form-control"
                          value={this.state.status}
                          onChange={(e) =>
                            this.setState({ status: e.target.value })
                          }
                          lista={status}
                        />
                      </FormGroup>
                    </div>
                  </div>
                )}

                <button
                  type="button"
                  className="btn btn-success"
                  onClick={this.props.isCadastro ? this.cadastrar : this.editar}
                >
                  Salvar
                </button>
                <a className="btn btn-danger" href="#/consulta-lancamentos">
                  Cancelar
                </a>
              </div>
            </div>
          </div>
          <br />
        </Card>
      </div>
    );
  }
}

export default DetalheLancamento;
