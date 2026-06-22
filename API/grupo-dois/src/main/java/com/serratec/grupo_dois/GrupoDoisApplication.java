package com.serratec.grupo_dois;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.serratec.grupo_dois.model.Aluno;
import com.serratec.grupo_dois.model.Usuario;
import com.serratec.grupo_dois.repository.AlunoRepository;
import com.serratec.grupo_dois.repository.UsuarioRepository;

@SpringBootApplication
public class GrupoDoisApplication {

	public static void main(String[] args) {
		SpringApplication.run(GrupoDoisApplication.class, args);
	}

	@Bean
	CommandLineRunner initDatabase(UsuarioRepository repository, AlunoRepository alunoRepository) {
		return args -> {
			if (repository.count() == 0) {
				Usuario admin = new Usuario();
				admin.setEmail("grupo2@gmail.com");
				admin.setSenha("123456");
				repository.save(admin);
				System.out.println("--> Usuário de teste criado: admin@faculdade.com / 123456");
			}
			if (alunoRepository.count() == 0) {
				Aluno aluno1 = new Aluno();
				aluno1.setNome("Ana Silva");
				aluno1.setMatricula("2026001");
				aluno1.setCurso("Análise e Desenvolvimento de Sistemas");

				Aluno aluno2 = new Aluno();
				aluno2.setNome("Bruno Souza");
				aluno2.setMatricula("2026002");
				aluno2.setCurso("Engenharia de Software");

				Aluno aluno3 = new Aluno();
				aluno3.setNome("Carla Mendes");
				aluno3.setMatricula("2026003");
				aluno3.setCurso("Sistemas de Informação");

				alunoRepository.save(aluno1);
				alunoRepository.save(aluno2);
				alunoRepository.save(aluno3);
				System.out.println("--> Alunos iniciais carregados com sucesso no H2!");
			}
		};
	}

}
