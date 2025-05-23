package com.chiqueto.financaspessoais.api.resource;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.chiqueto.financaspessoais.api.dto.AtualizaStatusDTO;
import com.chiqueto.financaspessoais.api.dto.LancamentoDTO;
import com.chiqueto.financaspessoais.enums.StatusLancamento;
import com.chiqueto.financaspessoais.enums.TipoLancamento;
import com.chiqueto.financaspessoais.exceptions.RegraNegocioException;
import com.chiqueto.financaspessoais.model.entity.Lancamento;
import com.chiqueto.financaspessoais.model.entity.Usuario;
import com.chiqueto.financaspessoais.service.LancamentoService;
import com.chiqueto.financaspessoais.service.UsuarioService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/lancamentos")
@RequiredArgsConstructor
public class LancamentoResource {

	private final LancamentoService service;
	private final UsuarioService usuarioService;
	
	@PostMapping
	public ResponseEntity salvar(@RequestBody LancamentoDTO dto) {
		try {
			Lancamento entidade = converter(dto);
			entidade = service.salvar(entidade);
			return new ResponseEntity(entidade, HttpStatus.CREATED);
		}catch(RegraNegocioException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}
	
	@PutMapping("{id}")
	public ResponseEntity atualizar(@PathVariable("id") Long id, @RequestBody LancamentoDTO dto) {
		return service.obterPorId(id).map(entity -> {
			try {
				Lancamento lancamento = converter(dto);
				lancamento.setId(entity.getId());
				service.atualizar(lancamento);
				return ResponseEntity.ok(lancamento);
			}catch (RegraNegocioException e) {
				return ResponseEntity.badRequest().body(e.getMessage());
			}
			
		}).orElseGet(() -> new ResponseEntity("Lançamento não encontrado na base de dados.", HttpStatus.BAD_REQUEST));
	};
	
	@PutMapping("{id}/atualiza-status")
	public ResponseEntity atualizaStatus (@PathVariable("id") Long id, @RequestBody AtualizaStatusDTO dto) {
		return service.obterPorId(id).map(entidade -> {
			StatusLancamento statusSelecionado = StatusLancamento.valueOf(dto.getStatus());
			
			if(statusSelecionado == null) {
				return ResponseEntity.badRequest().body("Não foi possível atualizar o status do lançamento, envie um status válido");
			}
			try {
				entidade.setStatus(statusSelecionado);
				service.atualizar(entidade);
				return ResponseEntity.ok(entidade);
			}catch(RegraNegocioException e){
				return ResponseEntity.badRequest().body(e.getMessage());
			}
		}).orElseGet(() -> 
			new ResponseEntity("Lançamento não encontrado na base de dados.", HttpStatus.BAD_REQUEST)
			);
				
	}
	

	
	@DeleteMapping("{id}")
	public ResponseEntity deletar(@PathVariable("id") Long id) {
		return service.obterPorId(id).map(entity -> {
			service.deletar(entity);
			return new ResponseEntity(HttpStatus.NO_CONTENT);
		}).orElseGet(() -> new ResponseEntity("Lançamento não encontrado na base de dados.", HttpStatus.BAD_REQUEST));
	}
	
	@GetMapping
	public ResponseEntity buscar(
			@RequestParam(value = "descricao", required = false) String descricao,
			@RequestParam(value = "mes", required = false) Integer mes,
			@RequestParam(value = "ano", required = false) Integer ano,
			@RequestParam(value = "tipo", required = false) TipoLancamento tipo,
			@RequestParam("usuario") Long idUsuario
		) {
		System.out.print(idUsuario);
		Lancamento lancamentoFiltro = new Lancamento();
		lancamentoFiltro.setDescricao(descricao);
		lancamentoFiltro.setMes(mes);
		lancamentoFiltro.setAno(ano);
		lancamentoFiltro.setTipo(tipo);
		
		Optional<Usuario> usuario = usuarioService.obterPorId(idUsuario);
		if(!usuario.isPresent()) {
			return ResponseEntity.badRequest().body("Não foi possível realizar a consulta. Usuário não encontrado para o Id informado");
		}else {
			lancamentoFiltro.setUsuario(usuario.get());
		}
		
		List<Lancamento> lancamentos = service.buscar(lancamentoFiltro);
		
		System.out.print(lancamentos);
		return ResponseEntity.ok(lancamentos);
	}
	
	@GetMapping("{id}")
	public ResponseEntity obterPorId(@PathVariable("id") Long id) {
		System.out.print("ENTROU");
		Optional<Lancamento> lancamento = service.obterPorId(id);
		
		if(!lancamento.isPresent()) {
			return new ResponseEntity(HttpStatus.NOT_FOUND);
		}
		
		return ResponseEntity.ok(lancamento);
	};
	
	
	public Lancamento converter(LancamentoDTO dto) {
		Lancamento lancamento = new Lancamento();
		lancamento.setDescricao(dto.getDescricao());
		lancamento.setAno(dto.getAno());
		lancamento.setMes(dto.getMes());
		lancamento.setValor(dto.getValor());
		
		Usuario usuario = usuarioService
				.obterPorId(dto.getUsuario())
				.orElseThrow( () -> new RegraNegocioException("Usuario não encontrado"));
		
		lancamento.setUsuario(usuario);
		if(dto.getTipo() != null){
			lancamento.setTipo(TipoLancamento.valueOf(dto.getTipo()));
		}
		if(dto.getStatus() != null) {
			lancamento.setStatus(StatusLancamento.valueOf(dto.getStatus()));
		}
		return lancamento;
	}
}
