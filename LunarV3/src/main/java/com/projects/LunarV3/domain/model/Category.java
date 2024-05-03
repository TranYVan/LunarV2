package com.projects.LunarV3.domain.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.audit.DateAudit;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(
        name = "categories"
)
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Category extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})

    private Long id;

    @Column(unique = true)
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String name;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "category")
    private List<Product> products;

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
}
