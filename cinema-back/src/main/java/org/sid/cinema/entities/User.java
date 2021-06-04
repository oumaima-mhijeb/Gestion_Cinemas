package org.sid.cinema.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Data @NoArgsConstructor @AllArgsConstructor @ToString
public class User {
	
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)	
	private Long id;
	@Column(length=75)
	private String username;
	@Column(length=75)
	private String password;
	
}
