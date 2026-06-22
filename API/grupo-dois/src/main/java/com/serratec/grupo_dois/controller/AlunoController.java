package com.serratec.grupo_dois.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serratec.grupo_dois.model.Aluno;
import com.serratec.grupo_dois.repository.AlunoRepository;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "http://localhost:5173")
public class AlunoController {

	@Autowired
	private AlunoRepository repository;
	
	@PostMapping
	public ResponseEntity<Aluno> cadastrar(@RequestBody Aluno aluno) {
		Aluno novoAluno = repository.save(aluno);
		return ResponseEntity.ok(novoAluno);
	}
	
	@GetMapping
	public ResponseEntity<List<Aluno>> listarAlunos() {
		List<Aluno> lista = repository.findAll();
		return ResponseEntity.ok(lista);
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Aluno> buscarPorId(@PathVariable Long id) {
	    return repository.findById(id)
	            .map(aluno -> ResponseEntity.ok(aluno)) 
	            .orElse(ResponseEntity.notFound().build());
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id) {
	    if (!repository.existsById(id)) {
	        return ResponseEntity.notFound().build();
	    }
	    repository.deleteById(id);
	    return ResponseEntity.noContent().build();
	}

	@PutMapping("/{id}")
	public ResponseEntity<Aluno> atualizar(@PathVariable Long id, @RequestBody Aluno dadosAtualizados) {
	    return repository.findById(id).map(alunoExistente -> {
	        alunoExistente.setNome(dadosAtualizados.getNome());
	        alunoExistente.setMatricula(dadosAtualizados.getMatricula());
	        alunoExistente.setCurso(dadosAtualizados.getCurso());
	        
	        Aluno alunoSalvo = repository.save(alunoExistente);
	        return ResponseEntity.ok(alunoSalvo); 
	    }).orElse(ResponseEntity.notFound().build()); 
	}
}
