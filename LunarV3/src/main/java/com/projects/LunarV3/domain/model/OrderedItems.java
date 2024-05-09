package com.projects.LunarV3.domain.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderedItems {
    @EmbeddedId
    private OrderedItemId id = new OrderedItemId();

    @ManyToOne
    @MapsId("orderId")
    @JoinColumn(name = "order_id")
    @JsonIgnore
    private Order order;

    @ManyToOne
    @MapsId("productId")
    @JoinColumn(name = "product_id")
    @JsonView({Views.ExternalView.class})
    private Product product;

    @JsonView({Views.ExternalView.class})
    private Integer amount;
    @JsonView({Views.ExternalView.class})
    private Double price;
    @JsonView({Views.ExternalView.class})
    private Float discount;
}
