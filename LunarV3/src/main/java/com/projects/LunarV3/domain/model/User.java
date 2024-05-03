package com.projects.LunarV3.domain.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.audit.DateAudit;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(
        name = "users",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {
                        "email"
                })
        })
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User extends DateAudit {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(Views.ExternalView.class)
    private Long id;

    @Column(length = 60, nullable = false)
    @NotBlank
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String fullName;

    @Email
    @NotBlank
    @JsonView(Views.ExternalView.class)
    private String email;

    @Size(min = 8, max=70, message = "Password must be in range 8 and 70 characters")
    @JsonView({Views.InternalView.class, Views.UpdateView.class})
    private String password;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "user_roles",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "role_id"))
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Set<Role> roles;

    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private LocalDate birthday;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String phone;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    @Column(columnDefinition = "TEXT")
    private String avatar;

}
