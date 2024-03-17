package com.projectcollections.LunarBackend.domain.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name="orderItems")
public class OrderItem {

    @ManyToOne
    @JoinColumn(name="order_id", nullable = false)
    @Id
    private Order order;

    @ManyToOne
    @JoinColumn(name = "itemId", nullable = false)
    @Id
    private Product item;

    @PositiveOrZero
    private Long quantity;

    @PositiveOrZero
    private Float price;

    private Float discount;

}
