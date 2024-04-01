package com.projects.LunarV3.controller;

import com.projects.LunarV3.domain.dto.AuthenticationRequest;
import com.projects.LunarV3.domain.dto.AuthenticationResponse;
import com.projects.LunarV3.domain.dto.RegisterRequest;
import com.projects.LunarV3.security.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthenticationService service;

    @PostMapping(path = "/register")
    public ResponseEntity<AuthenticationResponse>register(
            @RequestBody RegisterRequest request
    ) {

        return ResponseEntity.ok(service.register(request));
    }

    @PostMapping(path = "/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        System.out.println(request);
        return ResponseEntity.ok(service.authenticate(request));
    }

}
