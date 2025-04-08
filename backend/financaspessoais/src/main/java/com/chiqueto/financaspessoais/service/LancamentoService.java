
package com.chiqueto.financaspessoais.service;

import java.util.List;
import java.util.Optional;

import com.chiqueto.financaspessoais.enums.StatusLancamento;
import com.chiqueto.financaspessoais.model.entity.Lancamento;

public interface LancamentoService {
	Lancamento salvar (Lancamento lancamento);
	
	Lancamento atualizar (Lancamento lancamento);
	
	void deletar (Lancamento lancamento);
	
	List<Lancamento> buscar(Lancamento lancamentoFiltro);
	
	void atualizarStatus (Lancamento lancamento, StatusLancamento status);
	
	void validar(Lancamento lancamento);
	
	Optional<Lancamento> obterPorId (Long id);
}
