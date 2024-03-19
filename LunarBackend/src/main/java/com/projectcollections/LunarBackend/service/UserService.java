package com.projectcollections.LunarBackend.service;

import com.projectcollections.LunarBackend.domain.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;

import java.util.List;
import java.util.Optional;

public interface UserService  {

    List<User> findAll();
    Optional<User> findById(Long id);
    Optional<User> findByEmail(String email);



}
