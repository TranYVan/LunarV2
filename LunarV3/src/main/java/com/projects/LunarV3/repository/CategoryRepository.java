package com.projects.LunarV3.repository;

import com.projects.LunarV3.domain.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    Boolean existsByName(String name);
    List<Category> findAllByStatus(Category.Status status);
}
