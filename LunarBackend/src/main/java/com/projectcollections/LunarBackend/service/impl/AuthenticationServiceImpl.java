package com.projectcollections.LunarBackend.service.impl;

import com.projectcollections.LunarBackend.controller.auth.AuthenticationRequest;
import com.projectcollections.LunarBackend.controller.auth.AuthenticationResponse;
import com.projectcollections.LunarBackend.controller.auth.RegisterRequest;
import com.projectcollections.LunarBackend.domain.model.Role;
import com.projectcollections.LunarBackend.domain.model.User;
import com.projectcollections.LunarBackend.repository.UserRepository;
import com.projectcollections.LunarBackend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtServiceImpl jwtServiceImpl;
    private final AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        Role role = Role.USER;
        if (request.getRole() != null) {
            role = Role.valueOf(request.getRole());
        }

        var user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .birthdate(request.getBirthdate())
                .phone(request.getPhone())
                .address(request.getAddress())
                .city(request.getCity())
                .country(request.getCountry())
                .role(role)
                .build();

        System.out.println(user);

        userRepository.save(user);
        var jwtToken = jwtServiceImpl.generateToken(user);

        return AuthenticationResponse.builder()
                .token(jwtToken).build();
    }

    @Override
    public AuthenticationResponse authenticate(
            AuthenticationRequest request
    ) {

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtServiceImpl.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken).build();
    }
}
