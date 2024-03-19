package com.projectcollections.LunarBackend;

import lombok.extern.java.Log;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@Log
public class LunarBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(LunarBackendApplication.class, args);
	}

}
