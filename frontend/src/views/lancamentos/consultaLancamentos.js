import React from "react";
import { withRouter } from "react-router-dom";

import Card from "../../components/card";
import FormGroup from "../../components/formGroup";
import SelectMenu from "../../components/selectMenu";
import LancamentosTable from "./lancamentosTable";
import LancamentoService from "../../app/services/lancamentoService";
import LocalStorageService from "../../app/services/localstorageService";
import * as messages from "../../components/toastr";
import { Modal, Button } from "react-bootstrap";

class ConsultaLancamentos extends React.Component {
  state = {
    ano: "",
    mes: "",
    tipo: "",
    lancamentos: [],
    showModal: false,
    lancamentoExcluir: null,
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

  atualizaStatusEfetivado = (id) => {
    this.service
      .efetivar(id)
      .then((response) => {
        messages.mensagemSucesso("Lançamento efetivado com sucesso!");
        this.buscar();
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu um erro ao efetivar o lançamento!");
      });
  };

  editaLancamento = (id) => {
    this.props.history.push(`/edita-lancamento/${id}`);
  };

  atualizaStatusCancelado = (id) => {
    this.service
      .cancelar(id)
      .then((response) => {
        messages.mensagemSucesso("Lançamento cancelado com sucesso!");
        this.buscar();
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu um erro ao cancelar o lançamento!");
      });
  };

  // Função para abrir o modal
  excluirLancamento = (id) => {
    this.setState({ showModal: true, lancamentoExcluir: id });
  };

  // Função que confirma a exclusão
  confirmarExclusao = () => {
    const { lancamentoExcluir, lancamentos } = this.state;

    // Filtra a lista de lançamentos para remover o item excluído
    const lancamentosAtualizados = lancamentos.filter(
      (lancamento) => lancamento.id !== lancamentoExcluir
    );

    // Atualiza o estado com a nova lista de lançamentos
    this.setState({
      lancamentos: lancamentosAtualizados,
      showModal: false,
      lancamentoExcluir: null,
    });

    // Chama o serviço de exclusão para remover o lançamento da base de dados
    this.service
      .excluir(lancamentoExcluir)
      .then((response) => {
        messages.mensagemSucesso("Lançamento excluído com sucesso!");
      })
      .catch((error) => {
        messages.mensagemErro("Ocorreu um erro ao excluir o lançamento!");
      });
  };

  // Função que cancela a exclusão
  cancelarExclusao = () => {
    this.setState({ showModal: false, lancamentoExcluir: null }); // Fecha o modal sem excluir
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

                <a
                  className="btn btn-primary "
                  href="#/cadastro-lancamento"
                  role="button"
                >
                  <i className="pi pi-plus pr-2"></i>
                  Cadastrar
                </a>
              </div>
            </div>
          </div>
          <br />
          <div className="row">
            <div class="col-md-12">
              <LancamentosTable
                lancamentos={this.state.lancamentos}
                atualizaStatusCancelado={this.atualizaStatusCancelado}
                atualizaStatusEfetivado={this.atualizaStatusEfetivado}
                excluirLancamento={this.excluirLancamento}
                editaLancamento={this.editaLancamento}
              />
            </div>
          </div>
        </Card>
        {/* Modal de Confirmação */}
        <Modal
          show={this.state.showModal}
          onHide={this.cancelarExclusao}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirmar Exclusão</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja excluir este lançamento?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.cancelarExclusao}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={this.confirmarExclusao}>
              Excluir
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default withRouter(ConsultaLancamentos);
