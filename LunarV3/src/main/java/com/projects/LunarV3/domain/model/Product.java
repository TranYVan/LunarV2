package com.projects.LunarV3.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.audit.UserDateAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;


@EqualsAndHashCode(callSuper = true)
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
    private Float rating;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    @Column(columnDefinition = "TEXT")
    private String thumbnails;

    @ManyToOne
    @JoinColumn(name = "categoryId", referencedColumnName = "id")
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Category category;

    public enum Status {
        AVAILABLE("available"),
        REMOVED("removed"),
        UNAVAILABLE("unavailable");

        private final String value;

        Status(String value) {
            this.value = value;
        }
        @Override
        public String toString() {
            return value;
        }
    }

    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    @Enumerated(EnumType.STRING)
    private Status status;

    @OneToMany(mappedBy = "product", cascade = CascadeType.ALL)
    @JsonIgnore
    private Collection<OrderedItems> orderItems = new ArrayList<>();
}
