package com.projectcollections.LunarBackend.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Range;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "products")
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;

    @NotBlank
    private String name;

    @NotNull
    private String thumbnail;

    @ManyToOne
    @JoinColumn(name="categoryId")
    private Category category;

    private String description;

    @PositiveOrZero
    private Integer stockQuantity;

    @PositiveOrZero
    private Float cost;

    @PositiveOrZero
    private String sold;

    @Range(min = 0L, max = 5L)
    private Float rating;

    @Range(min = 0L, max = 100L)
    private Float discount;
}
