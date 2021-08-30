package com.contactura.contactura;

import java.util.stream.LongStream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.contactura.contactura.model.Contactura;
import com.contactura.contactura.repository.ContacturaRepository;

@SpringBootApplication
public class ContacturaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ContacturaApplication.class, args);
		
//		
//		List<Integer> numeros = new ArrayList<>();
//		
//		numeros.add(5);
//		numeros.add(10);
//		numeros.add(15);
//		
//		//AS duas formas tem as mesma função, porém a segunda forma usa :: como método de referência 
//		numeros.forEach(item -> System.out.println("---> " + item ));
//		numeros.forEach(System.out::println);
		
		
		
	}

	@Bean
	CommandLineRunner init(ContacturaRepository repository){
		return args -> {
			repository.deleteAll();
			LongStream.range(1, 100).mapToObj(id -> {
				Contactura c = new Contactura();
				c.setName("Contactura User " + id);
				c.setPhone("(081) 9" + id + id + id + id + "-" + id + id + id + id);
				c.setEmail("contactura_user" + id + "@contactura.com");
				return c;
			}).map(record -> repository.save(record))
			.forEach(System.out::println);
		};
	}
	
}
