package com.projects.LunarV3.repository;

import com.projects.LunarV3.domain.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID> {
    Boolean existsByName(String name);
    Page<Product> findAllByStatus(Product.Status status, Pageable pageable);
    Page<Product> findAllByStatusAndCategoryName(Product.Status status, String categoryName, Pageable pageable);
    Page<Product> findAllByStatusAndNameLike(Product.Status status, String name, Pageable pageable);
    Page<Product> findAllByNameLike(String name, Pageable pageable);
}
