package com.projectcollections.LunarBackend.controller;

import com.projectcollections.LunarBackend.domain.dto.CategoryDto;
import com.projectcollections.LunarBackend.domain.model.Category;
import com.projectcollections.LunarBackend.mapper.Mapper;
import com.projectcollections.LunarBackend.mapper.impl.CategoryMapper;
import com.projectcollections.LunarBackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;
    private final Mapper<Category, CategoryDto> categoryMapper;

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAll() {
        System.out.println("get all category");
        List<Category> categories = categoryService.findAll();

        return new ResponseEntity<>(categories.stream()
                .map(categoryMapper::mapTo)
                .collect(Collectors.toList()),
                HttpStatus.OK);
    }

    @GetMapping(path = "/id={id}")
    public ResponseEntity<CategoryDto> getById(
            @PathVariable("id") Integer id
    ) {
        System.out.println("get by id");
        Optional<Category> categoryEntity = categoryService.findById(id);

        return categoryEntity.map(category -> {
            CategoryDto categoryDto = categoryMapper.mapTo(category);
            return new ResponseEntity<>(categoryDto, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<CategoryDto> createCategory(
            @RequestBody CategoryDto categoryDto
    ) {
        System.out.println("create category");
        Category category = categoryMapper.mapFrom(categoryDto);
        Category createdCategory = categoryService.save(category);
        return new ResponseEntity<>(categoryMapper.mapTo(createdCategory), HttpStatus.OK);
    }
}
