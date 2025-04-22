import React from "react";

export default function LancamentosTable(props) {
  const EfetivaLancamento = (id) => {
    props.atualizaStatusEfetivado(id);
  };

  const EditarLancamento = (id) => {
    props.editaLancamento(id);
  };

  const CancelaLancamento = (id) => {
    props.atualizaStatusCancelado(id);
  };

  const ExcluirLancamento = (id) => {
    props.excluirLancamento(id);
  };

  const rows = props.lancamentos.map((lancamento) => {
    return (
      <tr key={lancamento.id}>
        <td className="align-middle">{lancamento.descricao}</td>
        <td className="align-middle">
          R${" "}
          {lancamento.valor.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </td>
        <td className="align-middle text-uppercase">{lancamento.tipo}</td>
        <td className="align-middle">{lancamento.mes}</td>
        <td className="align-middle">
          <span className={`badge ${getStatusBadgeClass(lancamento.status)}`}>
            {lancamento.status}
          </span>
        </td>
        <td className="align-middle">
          <div className="d-flex gap-1">
            <button
              disabled={
                lancamento.status === "CANCELADO" ||
                lancamento.status === "EFETIVADO"
              }
              className="btn btn-success btn-sm btn-action"
              onClick={() => EfetivaLancamento(lancamento.id)}
              title="Efetivar"
            >
              <i className="pi pi-check"></i>
            </button>
            <button
              disabled={
                lancamento.status === "CANCELADO" ||
                lancamento.status === "EFETIVADO"
              }
              className="btn btn-warning btn-sm btn-action"
              onClick={() => CancelaLancamento(lancamento.id)}
              title="Cancelar"
            >
              <i className="pi pi-times"></i>
            </button>
            <button
              className="btn btn-primary btn-sm btn-action"
              onClick={() => EditarLancamento(lancamento.id)}
              title="Editar"
            >
              <i className="pi pi-pencil"></i>
            </button>
            <button
              className="btn btn-danger btn-sm btn-action"
              onClick={() => ExcluirLancamento(lancamento.id)}
              title="Excluir"
            >
              <i className="pi pi-trash"></i>
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div className="table-responsive">
      <table className="table table-striped table-bordered table-hover m-0">
        <thead className="table-light">
          <tr>
            <th scope="col">Descrição</th>
            <th scope="col">Valor</th>
            <th scope="col">Tipo</th>
            <th scope="col">Mês</th>
            <th scope="col">Situação</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
}

// Função auxiliar para classes de status
function getStatusBadgeClass(status) {
  switch (status) {
    case "PENDENTE":
      return "bg-warning text-dark";
    case "EFETIVADO":
      return "bg-success text-white";
    case "CANCELADO":
      return "bg-danger text-white";
    default:
      return "bg-secondary text-white";
  }
}
