package com.projectcollections.LunarBackend.service.impl;

import com.projectcollections.LunarBackend.domain.model.User;
import com.projectcollections.LunarBackend.repository.UserRepository;
import com.projectcollections.LunarBackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public List<User> findAll() {
        return StreamSupport.stream(
                userRepository.findAll()
                .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
