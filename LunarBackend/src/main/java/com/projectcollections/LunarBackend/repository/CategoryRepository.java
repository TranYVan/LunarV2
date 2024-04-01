package com.projectcollections.LunarBackend.repository;

import com.projectcollections.LunarBackend.domain.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
}
