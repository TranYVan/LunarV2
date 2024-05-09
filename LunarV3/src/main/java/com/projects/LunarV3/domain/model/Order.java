package com.projects.LunarV3.domain.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.UUID;

@Entity
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonView(Views.ExternalView.class)
    private UUID id;

    @ManyToOne
    @JoinColumn(name = "userId", referencedColumnName = "id")
    @JsonView(Views.ExternalView.class)
    private User user;

    @JsonView({Views.ExternalView.class})
    private Double itemsPrice;
    @JsonView({Views.ExternalView.class})
    private Double shippingPrice;
    @JsonView({Views.ExternalView.class})
    private Double totalPrice;

    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Boolean isPaid;
    @JsonView({Views.ExternalView.class})
    private LocalDateTime paidAt;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Boolean isDelivered;
    @JsonView({Views.ExternalView.class})
    private LocalDateTime deliveredAt;

    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private Boolean isCanceled;
    @JsonView({Views.ExternalView.class})
    private LocalDateTime canceledAt;

    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerName;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerAddress;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerCity;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerCountry;
    @JsonView({Views.ExternalView.class, Views.UpdateView.class})
    private String customerPhone;

    @JsonView(Views.ExternalView.class)
    private String description;
    @JsonView(Views.ExternalView.class)
    private String paymentMethod;
    @JsonView(Views.ExternalView.class)
    private String deliveryMethod;
    @JsonView(Views.ExternalView.class)
    private Float discount;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    @JsonView({Views.ExternalView.class})
    private Collection<OrderedItems> orderedItems = new ArrayList<>();
}
