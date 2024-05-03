package com.projects.LunarV3.security;

import com.projects.LunarV3.domain.dto.AuthenticationRequest;
import com.projects.LunarV3.domain.dto.AuthenticationResponse;
import com.projects.LunarV3.domain.dto.RegisterRequest;
import com.projects.LunarV3.domain.model.Role;
import com.projects.LunarV3.domain.model.RoleName;
import com.projects.LunarV3.domain.model.User;
import com.projects.LunarV3.exception.UserAlreadyExistsException;
import com.projects.LunarV3.repository.RoleRepository;
import com.projects.LunarV3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.ApplicationContextException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private static final Logger logger = LoggerFactory.getLogger(AuthenticationService.class);

    public AuthenticationResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())){
            throw new UserAlreadyExistsException(request.getEmail());
        }

        var user = User
                .builder()
                .fullName(request.getFullName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .phone(request.getPhone())
                .birthday(request.getBirthday())
                .build();
        System.out.println(user.getPassword());
        System.out.println(request.getPassword());
        Role userRole = roleRepository.findByName(RoleName.ROLE_USER)
                .orElseThrow(() -> new ApplicationContextException("User Role is not available"));

        user.setRoles(Collections.singleton(userRole));

        userRepository.save(user);

        UserPrincipal userPrincipal = UserPrincipal.create(user);
        List<String> roles = userPrincipal.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).toList();

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles);
        claims.put("id", userPrincipal.getId());

        var token = jwtService.generateToken(claims, userPrincipal);
        return AuthenticationResponse.builder()
                .token(token)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        String token = null;
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        UserDetails user = userDetailsService.loadUserByUsername(request.getEmail());
        User user1 = userRepository.findByEmail(user.getUsername()).get();

        List<String> roles = user.getAuthorities()
                .stream()
                .map(GrantedAuthority::getAuthority).toList();

        Map<String, Object> claims = new HashMap<>();
        claims.put("roles", roles);
        claims.put("id", user1.getId());
        token = jwtService.generateToken(claims, user);

        return AuthenticationResponse
                .builder()
                .token(token)
                .build();

    }
}
