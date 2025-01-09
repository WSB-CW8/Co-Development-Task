package com.c8.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.client.RestTemplate;

/**
 * Main class for the Spring Boot API application.
 *
 * This class is responsible for bootstrapping the application using {@link SpringApplication}.
 * It also provides application-level beans and configurations.
 */
@SpringBootApplication
// @EnableScheduling // Uncomment this annotation to enable scheduled tasks in the application.
public class ApiApplication {

	/**
	 * Creates a {@link RestTemplate} bean for making RESTful HTTP requests.
	 *
	 * The {@link RestTemplate} is a synchronous client for HTTP communication
	 * and can be used for calling external APIs.
	 *
	 * @return A new {@link RestTemplate} instance.
	 */
	@Bean
	public RestTemplate restTemplate() {
		return new RestTemplate();
	}

	/**
	 * Main method that serves as the entry point of the Spring Boot application.
	 *
	 * This method invokes {@link SpringApplication#run(Class, String[])} to launch the application.
	 *
	 * @param args Command-line arguments passed to the application.
	 */
	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
	}

}
