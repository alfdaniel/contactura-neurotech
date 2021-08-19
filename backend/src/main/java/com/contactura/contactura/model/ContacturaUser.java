package com.contactura.contactura.model;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class ContacturaUser {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	private String username;
	private String password;
	private String name;
	private boolean admin;

}
