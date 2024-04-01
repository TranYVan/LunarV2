package com.projects.LunarV3.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.Product;
import com.projects.LunarV3.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/products")
@RequiredArgsConstructor
public class ProductController {
    private final ProductService productService;

    @PostMapping
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> createProduct(
            @RequestBody @JsonView(Views.InternalView.class) Product product
    ) {
        System.out.println(product);
        Product createdProduct = productService.save(product);

        return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
    }

    @GetMapping
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getAll(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "6") int size,
            @RequestParam(value = "sortAttribute", required = false,defaultValue = "name") String sortAttribute,
            @RequestParam(value = "sortDirection", defaultValue = "asc") String sortOrder
    ) {
        boolean isAsc = sortOrder.equals("asc");
        Page<Product> products = productService.findAll(page, size, sortAttribute, isAsc);

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PatchMapping(path = "/id={id}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> partialUpdateById(
            @PathVariable UUID id,
            @RequestBody @JsonView(Views.UpdateView.class) Product product
    ) {
        System.out.println("ID: " + id);
        System.out.println(product);
        if (!productService.isProductExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        product.setId(id);

        Product updatedProduct = productService.partialUpdate(id, product);

        return new ResponseEntity<>(updatedProduct,
                HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<?> deleteById(
            @PathVariable UUID id
    ) {
        if (!productService.isProductExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        productService.deleteById(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/id={id}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getById(
            @PathVariable UUID id
    ) {

        return productService.findById(id).map(product -> {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }).orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

}
