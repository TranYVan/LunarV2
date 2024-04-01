package com.projects.LunarV3.service;

import com.projects.LunarV3.domain.model.Product;
import com.projects.LunarV3.domain.model.User;
import com.projects.LunarV3.repository.ProductRepository;
import com.projects.LunarV3.utils.JsonPage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public Product save(Product product) {
        return productRepository.save(product);
    }

    public Page<Product> findAll(int page, int size, String sortAttribute, boolean isAsc) {
        Pageable pageable = isAsc ?
                PageRequest.of(page, size, Sort.by(sortAttribute).ascending()) :
                PageRequest.of(page, size, Sort.by(sortAttribute).descending());

        return new JsonPage<Product>(productRepository.findAll(pageable), pageable);

    }

    public boolean isProductExists(UUID id) {
        return productRepository.existsById(id);
    }

    public void deleteById(UUID id) {
        productRepository.deleteById(id);
    }

    public Product partialUpdate(UUID id, Product product) {
        product.setId(id);

        return productRepository
                .findById(id)
                .map(existingProduct -> {
                    Optional.ofNullable(product.getName()).ifPresent(existingProduct::setName);
                    Optional.ofNullable(product.getCost()).ifPresent(existingProduct::setCost);
                    Optional.ofNullable(product.getDescription()).ifPresent(existingProduct::setDescription);
                    Optional.ofNullable(product.getDiscount()).ifPresent(existingProduct::setDiscount);
                    Optional.ofNullable(product.getSoldQuantity()).ifPresent(existingProduct::setSoldQuantity);
                    Optional.ofNullable(product.getStockQuantity()).ifPresent(existingProduct::setStockQuantity);
                    Optional.ofNullable(product.getThumbnails()).ifPresent(existingProduct::setThumbnails);
                    Optional.ofNullable(product.getCategory()).ifPresent(existingProduct::setCategory);

                    return productRepository.save(existingProduct);
                }).orElseThrow(() -> new RuntimeException("Product does not exists"));
    }

    public Optional<Product> findById(UUID id) {
        return productRepository.findById(id);
    }
}
