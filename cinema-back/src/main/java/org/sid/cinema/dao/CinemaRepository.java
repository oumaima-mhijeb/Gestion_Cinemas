package org.sid.cinema.dao;

import java.util.List;

import org.sid.cinema.entities.Cinema;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
@RepositoryRestResource
@CrossOrigin("*")

public interface CinemaRepository extends JpaRepository<Cinema, Long> {
	 List<Cinema> findByVilleId(Long id);
     long deleteCinemaByIdAndVilleId(Long id, Long VilleId);
	
}
