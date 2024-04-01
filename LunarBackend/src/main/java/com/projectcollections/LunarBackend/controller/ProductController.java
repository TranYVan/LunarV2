package com.projectcollections.LunarBackend.controller;

import com.projectcollections.LunarBackend.domain.dto.ProductDto;
import com.projectcollections.LunarBackend.domain.model.Product;
import com.projectcollections.LunarBackend.mapper.impl.ProductMapper;
import com.projectcollections.LunarBackend.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v2/products")
public class ProductController {

    private final ProductService productService;
    private final ProductMapper mapper;

    @GetMapping
    private final ResponseEntity<List<ProductDto>> getAll() {
        List<Product> products = productService.findAll();
        return new ResponseEntity<>(products.stream()
                .map(mapper::mapTo)
                .collect(Collectors.toList()),
                HttpStatus.OK);
    }
}
