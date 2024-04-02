package com.projects.LunarV3.controller;


import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.User;
import com.projects.LunarV3.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
//    private final Mapper<User, UserDto> mapper;

//    private final ObjectMapper objectMapper;

    @GetMapping(path = "/get-all")
    @JsonView(Views.ExternalView.class)
    public Page<User> getAll(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "6") int size,
            @RequestParam(value = "sortAttribute", required = false,defaultValue = "fullName") String sortAttribute,
            @RequestParam(value = "sortDirection", defaultValue = "asc") String sortOrder
    ) {
        boolean isAsc = sortOrder.equals("asc");
        Page<User> users = userService.findAll(page, size, sortAttribute, isAsc);
        return users;
    }

    @PostMapping(path = "/create")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<User> create(
            @RequestBody @JsonView(Views.InternalView.class) User user
    ) {
        System.out.println(user);
        User createdUser = userService.save(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
    }

    @GetMapping(path = "/details/email={email}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getUserByEmail(
            @PathVariable("email") String email
    ) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(entity -> {
            return new ResponseEntity<>(entity, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PatchMapping(path = "/id={id}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> partialUpdate(
            @PathVariable("id") Long id,
            @RequestBody @JsonView(Views.UpdateView.class) User user
    ) {
        if (!userService.isUserExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        user.setId(id);
        User updatedUser = userService.partialUpdate(id, user);

        return new ResponseEntity<>(
                updatedUser,
                HttpStatus.OK);
    }

}
