package com.projects.LunarV3.service;

import com.projects.LunarV3.domain.model.Category;
import com.projects.LunarV3.domain.model.Product;
import com.projects.LunarV3.exception.ObjectAlreadyExistsException;
import com.projects.LunarV3.exception.ObjectNotFoundException;
import com.projects.LunarV3.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

    public List<Category> getAll() {
        return categoryRepository.findAllByStatus(Category.Status.AVAILABLE);
    }
    public void softDelete(Long id) {
        Optional<Category> categoryOptional = categoryRepository.findById(id);
        if (categoryOptional.isEmpty()) {
            throw  new ObjectNotFoundException("Product " + id + " Not Found");
        }
        Category category = categoryOptional.get();
        category.setStatus(Category.Status.REMOVED);
        categoryRepository.save(category);
    }
}
