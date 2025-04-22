import toastr from "toastr";
import "toastr/build/toastr.min.css";

// Configuração do Toastr
toastr.options = {
  closeButton: true,
  debug: false,
  newestOnTop: true,
  progressBar: true,
  positionClass: "toast-top-right",
  preventDuplicates: true,
  onclick: null,
  showDuration: 300,
  hideDuration: 1000,
  timeOut: 5000,
  extendedTimeOut: 1000,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut",
  // Classes personalizadas para garantir as cores
  toastClass: "toast",
  iconClasses: {
    error: "toast-error",
    info: "toast-info",
    success: "toast-success",
    warning: "toast-warning",
  },
};

export function mostrarMensagem(titulo, mensagem, tipo) {
  // Limpa toasts anteriores do mesmo tipo para evitar duplicatas
  toastr.clear();
  toastr[tipo](mensagem, titulo);
}

export function mensagemErro(mensagem) {
  mostrarMensagem("Erro", mensagem, "error");
}

export function mensagemSucesso(mensagem) {
  mostrarMensagem("Sucesso", mensagem, "success");
}

export function mensagemAlerta(mensagem) {
  mostrarMensagem("Alerta", mensagem, "warning");
}

// Adicione também para mensagens de informação se precisar
export function mensagemInfo(mensagem) {
  mostrarMensagem("Informação", mensagem, "info");
}
