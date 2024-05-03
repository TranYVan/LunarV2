package com.projects.LunarV3.controller;


import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.User;
import com.projects.LunarV3.exception.UserAlreadyExistsException;
import com.projects.LunarV3.exception.UsernameNotFoundException;
import com.projects.LunarV3.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping(path = "/api/v1/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

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
    public ResponseEntity<?> create(
            @RequestBody @JsonView(Views.InternalView.class) User user
    ) {

        try {
            User createdUser = userService.save(user);
            return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
        } catch(UserAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

    }

    @GetMapping(path = "/details/email={email}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getUserByEmail(
            @PathVariable("email") String email
    ) {
        try {
            User user = userService.getUserByEmail(email);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (UsernameNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>("Error fetching user", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping(path = "/details/id={id}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        try {
            User user = userService.getUserById(id);
            return new ResponseEntity<>(user, HttpStatus.OK);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PatchMapping(path = "/id={id}")
    @PreAuthorize("hasRole('ROLE_ADMIN') or (hasRole('ROLE_USER') and #id == principal.id)")
    @JsonView({Views.UpdateView.class})
    public ResponseEntity<?> partialUpdate(
            @PathVariable("id") Long id,
            @RequestBody @JsonView(Views.UpdateView.class) User user
    ) {
        try {
            user.setId(id);
            User updatedUser = userService.partialUpdate(id, user);

            return new ResponseEntity<>(
                    updatedUser,
                    HttpStatus.OK);
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
