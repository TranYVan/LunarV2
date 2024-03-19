package com.projectcollections.LunarBackend.controller;

import com.projectcollections.LunarBackend.domain.dto.UserDto;
import com.projectcollections.LunarBackend.domain.model.User;
import com.projectcollections.LunarBackend.mapper.Mapper;
import com.projectcollections.LunarBackend.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController()
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final Mapper<User, UserDto> userMapper;

    @GetMapping
    public ResponseEntity<List<UserDto>> getAll() {

        List<User> users = userService.findAll();

        return new ResponseEntity<>(users.stream()
                .map(userMapper::mapTo)
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @GetMapping(path = "/id={id}")
    public ResponseEntity<UserDto> getById(
            @PathVariable("id") Long id
    ) {
        Optional<User> userEntity =userService.findById(id);

        return userEntity.map(usr -> {
            UserDto userDto = userMapper.mapTo(usr);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @GetMapping(path="/email={email}")
    public ResponseEntity<UserDto> getByEmail(
            @PathVariable("email") String email
    ) {
        Optional<User> userEntity =userService.findByEmail(email);

        return userEntity.map(usr -> {
            UserDto userDto = userMapper.mapTo(usr);
            return new ResponseEntity<>(userDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }


}
