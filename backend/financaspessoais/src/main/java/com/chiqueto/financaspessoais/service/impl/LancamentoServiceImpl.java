package com.chiqueto.financaspessoais.service.impl;

import java.math.BigDecimal;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.ExampleMatcher.StringMatcher;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.chiqueto.financaspessoais.enums.StatusLancamento;
import com.chiqueto.financaspessoais.enums.TipoLancamento;
import com.chiqueto.financaspessoais.exceptions.RegraNegocioException;
import com.chiqueto.financaspessoais.model.entity.Lancamento;
import com.chiqueto.financaspessoais.repository.LancamentoRepository;
import com.chiqueto.financaspessoais.service.LancamentoService;

@Service
public class LancamentoServiceImpl implements LancamentoService {

	private LancamentoRepository repository;
	
	public LancamentoServiceImpl(LancamentoRepository repository) {
		this.repository = repository;		
	};
	
	@Override
	@Transactional //Transação no banco -> amarra o campo até que seja 100% completo o processo //Garante que ou a transação seja completa ou da um roll back - tudo ou nada
	public Lancamento salvar(Lancamento lancamento) {
		validar(lancamento);
		lancamento.setStatus(StatusLancamento.PENDENTE);
		return repository.save(lancamento);
	}

	@Override
	@Transactional
	public Lancamento atualizar(Lancamento lancamento) {
		
		Objects.requireNonNull(lancamento.getId());
		
		return repository.save(lancamento);
	}

	@Override
	@Transactional
	public void deletar(Lancamento lancamento) {
		Objects.requireNonNull(lancamento.getId());
		
		repository.delete(lancamento);
	}

	@Override
	@Transactional(readOnly = true)
	public List<Lancamento> buscar(Lancamento lancamentoFiltro) {
		Example example = Example.of(lancamentoFiltro, 
				ExampleMatcher.matching()
				.withIgnoreCase()
				.withStringMatcher(StringMatcher.CONTAINING)
				);
		return repository.findAll(example);
	}

	@Override
	public void atualizarStatus(Lancamento lancamento, StatusLancamento status) {
		lancamento.setStatus(status);
		
	}
	
	@Override
	public void validar(Lancamento lancamento){
		if(lancamento.getDescricao() == null || 
		   lancamento.getDescricao().trim().equals("")) {
			throw new RegraNegocioException("Informe uma descrição válida.");
		}
		
		if(lancamento.getMes() == null || 
		   lancamento.getMes() < 1 ||
		   lancamento.getMes() > 12) {
			throw new RegraNegocioException("Informe um Mês válido.");
		}
		
		if(lancamento.getAno() == null ||
		   lancamento.getAno().toString().length() != 4){
			throw new RegraNegocioException("Informe um Ano válido.");
		}
		
		if(lancamento.getUsuario() == null ||
		   lancamento.getUsuario().getId() == null){
			throw new RegraNegocioException("Informe um Usuário válido.");
		}
		
		if(lancamento.getValor() == null ||
		   lancamento.getValor().compareTo(BigDecimal.ZERO) < 1){
			throw new RegraNegocioException("Informe um Valor válido.");
		}
		
		if(lancamento.getTipo() == null){
			throw new RegraNegocioException("Informe um Tipo válido.");
		}
			
		
	}

	@Override
	public Optional<Lancamento> obterPorId(Long id) {
		return repository.findById(id);
	}

	@Override
	public BigDecimal ObeterSaldoPorUsuario(Long id) {
		
		BigDecimal receitas = repository.obterSaldoPorTipoLancamentoEUsuario(id, TipoLancamento.RECEITA);
		BigDecimal despesas = repository.obterSaldoPorTipoLancamentoEUsuario(id, TipoLancamento.DESPESA);
		
		if(receitas == null) {
			receitas = BigDecimal.ZERO;
		}
		if(despesas == null) {
			despesas = BigDecimal.ZERO;
		}
		
		return receitas.subtract(despesas);
	}
}
