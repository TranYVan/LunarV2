package com.projects.LunarV3.controller;

import com.projects.LunarV3.domain.dto.AuthenticationRequest;
import com.projects.LunarV3.domain.dto.AuthenticationResponse;
import com.projects.LunarV3.domain.dto.RegisterRequest;
import com.projects.LunarV3.exception.UserAlreadyExistsException;
import com.projects.LunarV3.security.AuthenticationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@AllArgsConstructor
public class AuthController {
    private final AuthenticationService service;

    @PostMapping(path = "/register")
    public ResponseEntity<?>register(
            @RequestBody RegisterRequest request
    ) {
        try {
            AuthenticationResponse result = service.register(request);
            return ResponseEntity.ok(result);
        } catch (UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    @PostMapping(path = "/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

}
