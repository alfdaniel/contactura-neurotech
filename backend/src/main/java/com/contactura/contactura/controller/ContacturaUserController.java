package com.contactura.contactura.controller;

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

import com.contactura.contactura.model.ContacturaUser;
import com.contactura.contactura.repository.ContacturaUserRepository;

@CrossOrigin()
@RestController
@RequestMapping({"/user"})
public class ContacturaUserController {
	
	@Autowired
	private ContacturaUserRepository repository;

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
			public ContacturaUser create(@RequestBody ContacturaUser user){
				return repository.save(user);
			}
		
			
	// Atualizar usuário http://localhost:8088/id
			@PutMapping(value = "{id}")
			public ResponseEntity<?> update(@PathVariable long id, @RequestBody ContacturaUser user){
				return repository.findById(id)
						.map(record -> {
							record.setName(user.getName());
							record.setUsername(user.getUsername());
							record.setPassword(user.getPassword());
							record.setAdmin(false);
							ContacturaUser update = repository.save(record);
							return ResponseEntity.ok().body(update);
						}).orElse(ResponseEntity.notFound().build());
			}
			
			
	// Deletar Usuáro http://localhost:8088/id
			@DeleteMapping(path = {"/{id}"})
			public ResponseEntity<?> delete(@PathVariable long id) {
				return repository.findById(id)
						.map(record -> {
							repository.deleteById(id);
							return ResponseEntity.ok().body(record);
							}).orElse(ResponseEntity.notFound().build());
			}
			

	
}
