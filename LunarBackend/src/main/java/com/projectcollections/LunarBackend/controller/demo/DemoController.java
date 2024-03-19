package com.projectcollections.LunarBackend.controller.demo;

import lombok.extern.java.Log;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/demo-controller")
public class DemoController {

    @GetMapping(path = "/sayHello")
    public ResponseEntity<String> sayHello() {
        System.out.println("Nice to meet you");
//        return ResponseEntity.ok("Hello from secured endpoint");
        return ResponseEntity.status(HttpStatus.OK).body("say hello");
    }

}
