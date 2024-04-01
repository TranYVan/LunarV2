package com.projectcollections.LunarBackend.service.impl;

import com.projectcollections.LunarBackend.domain.model.Category;
import com.projectcollections.LunarBackend.repository.CategoryRepository;
import com.projectcollections.LunarBackend.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository repository;


    @Override
    public List<Category> findAll() {
        return StreamSupport.stream(
                repository.findAll()
                        .spliterator(),
                false
        ).collect(Collectors.toList());
    }

    @Override
    public Optional<Category> findById(Object id) {
        return repository.findById((Integer) id);
    }

    @Override
    public Category save(Category entry) {
        return repository.save(entry);
    }
}
