package com.chiqueto.financaspessoais.service;

import java.util.Optional;

import com.chiqueto.financaspessoais.model.entity.Usuario;

public interface UsuarioService {
	Usuario autenticar(String email, String senha);
	
	Usuario salvarUsuario(Usuario usuario);
	
	void validarEmail(String email);
	
	Optional<Usuario> obterPorId(Long id);
}
