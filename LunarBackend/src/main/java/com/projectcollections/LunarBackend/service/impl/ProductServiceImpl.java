package com.projectcollections.LunarBackend.service.impl;

import com.projectcollections.LunarBackend.domain.model.Product;
import com.projectcollections.LunarBackend.repository.ProductRepository;
import com.projectcollections.LunarBackend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository repository;

    @Override
    public List<Product> findAll() {
        return repository.findAll();
    }

    @Override
    public Optional<Product> findById(Object id) {
        return Optional.empty();
    }

    @Override
    public Product save(Product entry) {
        return null;
    }
}
