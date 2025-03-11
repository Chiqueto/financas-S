package com.chiqueto.financaspessoais.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chiqueto.financaspessoais.model.entity.Lancamento;

public interface LancamentoRepository extends JpaRepository<Lancamento, Long> {

}
