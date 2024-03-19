package com.projectcollections.LunarBackend.domain.dto;

import com.projectcollections.LunarBackend.domain.model.Order;
import com.projectcollections.LunarBackend.domain.model.Role;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Past;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String fullName;
    private LocalDate birthdate;
    private String email;
    private String phone;
    private String address;
    private String city;
    private String country;
    private String avatar;
    private Role role;
    private List<Order> orders;
}
