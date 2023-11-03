package com.gmail.dag.markito.book_shop;

import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BookShopApplication extends ResourceConfig {

	public BookShopApplication() {
		register(new AdminFilter());
		register(new UserService());
		register(new BookService());
	}

	public static void main(String[] args) {
		SpringApplication.run(BookShopApplication.class, args);
	}

}
