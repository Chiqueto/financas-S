package com.chiqueto.financaspessoais.model.repository;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import com.chiqueto.financaspessoais.model.entity.Usuario;
import com.chiqueto.financaspessoais.repository.UsuarioRepository;

@ExtendWith(SpringExtension.class)
@SpringBootTest
@ActiveProfiles("test")
public class UsuarioRepositoryTest {

	@Autowired
	UsuarioRepository repository;
	
	@Test
	public void deveVerificarExistenciaDeUmEmail() {
		//cenário
		Usuario usuario = Usuario
				.builder()
				.nome("Alexandre")
				.email("alexandre@senai.com.br")
				.senha("123456")
				.build();
		
		repository.save(usuario);
		
		//ação/execução
		boolean result = repository.existsByEmail("alexandre@senai.com.br");
		
		//verificação
		Assertions.assertThat(result).isTrue();
	}
	
	
}
