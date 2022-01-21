package com.contactura.contactura.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.contactura.contactura.service.CustomUserDetailService;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private CustomUserDetailService customUserDetailService;

	protected void configure(HttpSecurity http) throws Exception {
		http.csrf().disable()
		.authorizeRequests().antMatchers(HttpMethod.OPTIONS, "/**")
		.permitAll()
		.anyRequest()
		.authenticated()
		.and()
		.httpBasic();

	}

	// Método para quando a autenticação é feita em memória
	// @Autowired
	// private void configreGlobal(AuthenticationManagerBuilder auth) throws
	// Exception {
	// auth.inMemoryAuthentication()
	// .withUser("daniel").password("{noop}root").roles("USER")
	// .and()
	// .withUser("cafe").password("{nopp}root").roles("USER", "ADIMN");
	//
	// }

	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(customUserDetailService).passwordEncoder(new BCryptPasswordEncoder());
	}

//	@Autowired
//	private Environment env;
//
//	private static final String[] PUBLIC_MATCHERS = { "/**" };
//
//	@Override
//	protected void configure(HttpSecurity http) throws Exception {
//
//		// H2
//		if (Arrays.asList(env.getActiveProfiles()).contains("test")) {
//			http.headers().frameOptions().disable();
//		}
//		
//		http.cors().and().csrf().disable();
//		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
//		http.authorizeRequests().antMatchers(PUBLIC_MATCHERS).permitAll();
//	}
//
	@Bean
	CorsConfigurationSource corsConfigurationSource() {
		CorsConfiguration configuration = new CorsConfiguration().applyPermitDefaultValues();
		configuration.setAllowedMethods(Arrays.asList("POST", "GET", "PUT", "DELETE", "OPTIONS"));
		final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
		source.registerCorsConfiguration("/**", configuration);
		return source;
	}
}
	
	

