package com.projects.LunarV3.domain.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.NaturalId;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Long id;

    @Enumerated(EnumType.STRING)
    @NaturalId
    @Column(length = 60)
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private RoleName name;


}
