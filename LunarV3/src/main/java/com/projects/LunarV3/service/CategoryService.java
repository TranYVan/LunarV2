package com.projects.LunarV3.service;

import com.projects.LunarV3.domain.model.Category;
import com.projects.LunarV3.exception.ObjectAlreadyExistsException;
import com.projects.LunarV3.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CategoryService {
    private final CategoryRepository categoryRepository;

    public Category save(Category category) {
        if (categoryRepository.existsByName(category.getName())) {
            throw new ObjectAlreadyExistsException(category.getName() + " already exists");
        }
        return categoryRepository.save(category);
    }

}
