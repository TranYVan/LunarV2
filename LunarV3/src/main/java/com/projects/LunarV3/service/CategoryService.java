package com.projects.LunarV3.service;

import com.projects.LunarV3.domain.model.Category;
import com.projects.LunarV3.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    public Optional<Category> getById(Long id) {
        return categoryRepository.findById(id);
    }


}
