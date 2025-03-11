package com.chiqueto.financaspessoais.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.chiqueto.financaspessoais.model.entity.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long>{
	
	Optional<Usuario> findByEmailAndNome(String email, String nome);
	
	Optional<Usuario> findByEmail(String email);
	
	boolean existsByEmail(String email);
	
}
