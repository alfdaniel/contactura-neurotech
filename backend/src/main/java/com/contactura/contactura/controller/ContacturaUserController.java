package com.contactura.contactura.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.contactura.contactura.model.ContacturaUser;
import com.contactura.contactura.repository.ContacturaUserRepository;

@CrossOrigin()
@RestController
@RequestMapping({"/user"})
public class ContacturaUserController {
	
	@Autowired
	private ContacturaUserRepository repository;

//	@RequestMapping("/login")
//	@GetMapping
//	public String login(HttpServletRequest request){
//		String token = requ
//	}
	
	
	// Lista todos usuários http://localhost:8088/user
			@GetMapping
			public List findALL(){
				return repository.findAll();
			}
			
			
	// Lista usuários por id http://localhost:8088/id
			@GetMapping(value = "{id}")
			public ResponseEntity<?> findById(@PathVariable long id) {
				return repository.findById(id)
						.map(user -> ResponseEntity.ok().body(user))
						.orElse(ResponseEntity.notFound().build());
					}
		
			
	// Criar novo Usuário http://localhost:8088/user
			@PostMapping
			@PreAuthorize("hasRole('ADMIN')")
			public ContacturaUser create(@RequestBody ContacturaUser user){
				user.setPassword(criptografarPassword(user.getPassword()));
				return repository.save(user);
			}
		
			
	// Atualizar usuário http://localhost:8088/id
			@PutMapping(value = "{id}")
			@PreAuthorize("hasRole('ADMIN')")
			public ResponseEntity<?> update(@PathVariable long id, @RequestBody ContacturaUser user){
				return repository.findById(id)
						.map(record -> {
							record.setName(user.getName());
							record.setUsername(user.getUsername());
							record.setPassword(criptografarPassword(user.getPassword()));
							record.setAdmin(user.isAdmin());
							ContacturaUser update = repository.save(record);
							return ResponseEntity.ok().body(update);
						}).orElse(ResponseEntity.notFound().build());
			}
			
			
	// Deletar Usuáro http://localhost:8088/id
			@DeleteMapping(path = {"/{id}"})
			@PreAuthorize("hasRole('ADMIN')")
			public ResponseEntity<?> delete(@PathVariable long id) {
				return repository.findById(id)
						.map(record -> {
							repository.deleteById(id);
							return ResponseEntity.ok().body(record);
							}).orElse(ResponseEntity.notFound().build());
			}
			

			private String criptografarPassword(String password) {
				BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
				String passwordParaCriptografar = passwordEncoder.encode(password);			
				return passwordParaCriptografar;
			}
			
}
