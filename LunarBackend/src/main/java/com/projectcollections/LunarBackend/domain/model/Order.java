package com.projectcollections.LunarBackend.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private User customer;

    @NotBlank
    private String customerPhone;

    private String description;

    @NotNull
    private Boolean isPaid;

    @NotNull
    @PositiveOrZero
    private Float shippingPrice;

    @NotNull
    private String paymentMethod;

    @OneToMany(mappedBy = "order")
    private List<OrderItem> items;

    private Float discount;


}
