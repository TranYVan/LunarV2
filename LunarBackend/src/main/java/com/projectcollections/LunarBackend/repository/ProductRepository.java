package com.projectcollections.LunarBackend.repository;

import com.projectcollections.LunarBackend.domain.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
