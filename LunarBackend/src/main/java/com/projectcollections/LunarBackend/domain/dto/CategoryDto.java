package com.projectcollections.LunarBackend.domain.dto;

import com.projectcollections.LunarBackend.domain.model.Product;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CategoryDto {
    private Integer id;
    private String title;
    private List<Product> productList;
}
