import ApiService from "../apiservice";

export default class LancamentoService extends ApiService {
  constructor() {
    super("/api/lancamentos");
  }

  consultar(lancamentoFiltro) {
    let params = `?ano=${lancamentoFiltro.ano}`;
    if (lancamentoFiltro.mes) {
      params = `${params}&mes=${lancamentoFiltro.mes}`;
    }

    if (lancamentoFiltro.tipo) {
      params = `${params}&tipo=${lancamentoFiltro.tipo}`;
    }
    if (lancamentoFiltro.status) {
      params = `${params}&status=${lancamentoFiltro.status}`;
    }
    if (lancamentoFiltro.usuario) {
      params = `${params}&usuario=${lancamentoFiltro.usuario}`;
    }
    return this.get(params);
  }

  cadastrar(lancamento) {
    return this.post("#/", lancamento);
  }

  efetivar(id) {
    return this.put(`/${id}/atualiza-status`, {
      status: "EFETIVADO",
    });
  }
  cancelar(id) {
    return this.put(`/${id}/atualiza-status`, {
      status: "CANCELADO",
    });
  }
  editar(lancamento, id) {
    return this.put(`/${id}`, lancamento);
  }
  obterLancamentoPorId(id) {
    return this.get(`/${id}`);
  }

  excluir(id) {
    return this.delete(`/${id}`);
  }
}
