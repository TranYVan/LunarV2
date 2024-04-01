package com.projects.LunarV3.domain.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.audit.UserDateAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;


@Entity
@Data
@Table(name = "products")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product extends UserDateAudit {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonView(Views.ExternalView.class)
    private UUID id;

    @Column(unique = true)
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String name;

    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String description;
    @PositiveOrZero
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Double cost;
    @PositiveOrZero
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Integer stockQuantity;
    @PositiveOrZero
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Integer soldQuantity;
    @PositiveOrZero
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Float discount;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String thumbnails;

    @ManyToOne
    @JoinColumn(name = "categoryId", referencedColumnName = "id")
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Category category;
}
