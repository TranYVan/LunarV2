package com.projects.LunarV3.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.Category;
import com.projects.LunarV3.exception.ObjectAlreadyExistsException;
import com.projects.LunarV3.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> createCategory(
            @RequestBody Category category
    ) {

        try {
            Category createdCategory = categoryService.save(category);
            return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
        } catch (ObjectAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }
}
