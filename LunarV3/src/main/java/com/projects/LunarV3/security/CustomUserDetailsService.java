package com.projects.LunarV3.security;

import com.projects.LunarV3.domain.model.User;
import com.projects.LunarV3.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException {
        User user = userRepository.findByEmail(username)
                .orElseThrow(() ->
                        new UsernameNotFoundException("User not found with email: " + username));
        System.out.println("Load by username"+user);
        return UserPrincipal.create(user);
    }

    public UserDetails loadUserById(Long id) {
        User user = userRepository
                .findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with id: " + id));
        return UserPrincipal.create(user);
    }
}
