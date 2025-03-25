package com.chiqueto.financaspessoais.model.entity;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.chiqueto.financaspessoais.enums.StatusLancamento;
import com.chiqueto.financaspessoais.enums.TipoLancamento;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="lancamento", schema="financas")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Lancamento {
	
	@Id
	@Column(name="id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name="descricao")
	private String descricao;
	
	@Column(name="mes")
	private Integer mes;

	@Column(name="ano")
	private Integer ano;
	
	@Column(name="valor")
	private BigDecimal valor;
	
	@ManyToOne
	@JoinColumn(name = "id_usuario")
	private Usuario usuario;
	
	@Column(name="data_cadastro")
	private LocalDate dataCadastro;
	
	@Column(name="tipo")
	@Enumerated(value=EnumType.STRING)
	private TipoLancamento tipo;

	@Column(name="status")
	@Enumerated(value=EnumType.STRING)
	private StatusLancamento status;
	
	
}
