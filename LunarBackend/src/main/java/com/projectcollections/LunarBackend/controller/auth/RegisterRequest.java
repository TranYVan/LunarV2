package com.projectcollections.LunarBackend.controller.auth;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
    private String fullName;
    private LocalDate birthdate;
    private String email;
    private String password;
    private String phone;
    private String address;
    private String city;
    private String country;
}
