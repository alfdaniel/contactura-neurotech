package com.contactura.contactura.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;

import com.contactura.contactura.model.Contactura;

@Repository
public interface ContacturaRepository extends JpaRepository<Contactura, Long> {

	@Query(value="SELECT * FROM contactura", nativeQuery = true)
	List<Contactura> findAllContact();
	
	
	@Query(value="SELECT * FROM contactura.contactura e WHERE e.email= ?1", nativeQuery = true)
	List<Contactura> findByEmail (String email);
	
	//@Query(value="SELECT * FROM contactura.contactura_user WHERE username like '%query%'", nativeQuery = true)
	
}
