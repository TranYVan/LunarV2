package com.projectcollections.LunarBackend.domain.dto;

import com.projectcollections.LunarBackend.domain.model.Category;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDto {
    private Long id;
    private String name;
    private String thumbnail;
    private Category category;
    private String description;
    private Integer stockQuantity;
    private Float cost;
    private String sold;
    private Float rating;
    private Float discount;
}
