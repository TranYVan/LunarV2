package com.projects.LunarV3.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.Product;
import com.projects.LunarV3.exception.ObjectAlreadyExistsException;
import com.projects.LunarV3.exception.ObjectNotFoundException;
import com.projects.LunarV3.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        try {
            Product createdProduct = productService.save(product);
            return new ResponseEntity<>(createdProduct, HttpStatus.CREATED);
        } catch (ObjectAlreadyExistsException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }

    }

    @GetMapping
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getAll(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "6") int size,
            @RequestParam(value = "sortAttribute", required = false,defaultValue = "name") String sortAttribute,
            @RequestParam(value = "sortDirection", defaultValue = "asc") String sortOrder,
            @RequestParam(value = "filter", required = false) List<String> filters
    ) {
        boolean isAsc = sortOrder.equals("asc");
        Page<Product> products = productService.findAll(page, size, sortAttribute, isAsc, filters);

        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @PatchMapping(path = "/id={id}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> partialUpdateById(
            @PathVariable UUID id,
            @RequestBody @JsonView(Views.UpdateView.class) Product product
    ) {
        try {
            product.setId(id);
            Product updatedProduct = productService.partialUpdate(id, product);
            return new ResponseEntity<>(updatedProduct,
                    HttpStatus.OK);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }

    }

    @DeleteMapping(path = "/id={id}")
    public ResponseEntity<?> deleteById(
            @PathVariable UUID id
    ) {
        if (!productService.isProductExists(id)) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        productService.softDelete(id);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(path = "/delete-many")
    public ResponseEntity<?> deleteMany(@RequestBody List<UUID> ids) {
        try {
            productService.softDeleteMany(ids);
            return ResponseEntity.status(HttpStatus.OK).body("Delete Successfully");

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping(path = "/id={id}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getById(
            @PathVariable UUID id
    ) {
        try {
            Product product = productService.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(product);

        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

}
