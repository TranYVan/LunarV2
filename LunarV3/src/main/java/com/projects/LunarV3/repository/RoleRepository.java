package com.projects.LunarV3.repository;

import com.projects.LunarV3.domain.model.Role;
import com.projects.LunarV3.domain.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName name);
}
