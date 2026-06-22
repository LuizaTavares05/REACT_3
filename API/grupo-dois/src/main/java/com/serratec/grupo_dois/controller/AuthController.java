package com.serratec.grupo_dois.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serratec.grupo_dois.model.Usuario;
import com.serratec.grupo_dois.repository.UsuarioRepository;

@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {
	
	@Autowired
	private UsuarioRepository usuarioRepository;
	
	@PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario dadosLogin) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(dadosLogin.getEmail());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getSenha().equals(dadosLogin.getSenha())) {
                return ResponseEntity.ok("Login efetuado com sucesso!");
            }
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorretos.");
    }
}
