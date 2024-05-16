package com.projects.LunarV3.service;

import com.projects.LunarV3.domain.model.Order;
import com.projects.LunarV3.domain.model.OrderedItems;
import com.projects.LunarV3.domain.model.Product;
import com.projects.LunarV3.exception.InsufficientResourceException;
import com.projects.LunarV3.exception.ObjectNotFoundException;
import com.projects.LunarV3.repository.OrderRepository;
import com.projects.LunarV3.repository.ProductRepository;
import com.projects.LunarV3.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public Order saveOrder(Order order) {

        Order newOrder = getOrder(order);
        if (newOrder.getIsPaid()) {
            newOrder.setPaidAt(LocalDateTime.now());
        }
        newOrder.getOrderedItems().addAll((order.getOrderedItems()
                        .stream()
                        .map(it -> {
                            Optional<Product> productOptional = productRepository.findById(it.getProduct().getId());
                            if (productOptional.isPresent()) {
                                Product product = productOptional.get();
                                OrderedItems newOrderItems = new OrderedItems();
                                if (it.getAmount() > product.getStockQuantity()) {
                                    throw new InsufficientResourceException("The stock number is not enough.");
                                }

                                newOrderItems.setProduct(product);
                                newOrderItems.setOrder(newOrder);
                                newOrderItems.setPrice(it.getPrice());
                                newOrderItems.setAmount(it.getAmount());
                                newOrderItems.setDiscount(it.getDiscount());


                                product.setSoldQuantity(product.getSoldQuantity() + it.getAmount());
                                product.setStockQuantity(product.getStockQuantity() - it.getAmount());

                                productRepository.save(product);
                                return newOrderItems;
                            }
                            return null;
                        })
                        .toList()
        ));

        return orderRepository.save(newOrder);
    }

    public List<Order> getAll() {
        return orderRepository.findAll();
    }

    public List<Order> getAllByUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new ObjectNotFoundException("User not found");
        }

        return orderRepository.findAllByUserId(id);
    }

    public Order getDetail(UUID id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            throw new ObjectNotFoundException("Order " + id + " not found");
        }

        return optionalOrder.get();
    }

    public Order update(UUID id, Order order) {
        order.setId(id);

        return orderRepository
                .findById(id)
                .map(existingOrder -> {
                    if (order.getIsCanceled() != null && order.getIsCanceled() != existingOrder.getIsCanceled()) {
                        existingOrder.setIsCanceled(true);
                        existingOrder.setCanceledAt(LocalDateTime.now());
                    }
                    if (order.getIsDelivered() != null && order.getIsDelivered() != existingOrder.getIsDelivered()) {
                        existingOrder.setIsDelivered(true);
                        existingOrder.setDeliveredAt(LocalDateTime.now());
                    }
                    if (order.getIsPaid() != null && order.getIsPaid() != existingOrder.getIsPaid()) {
                        existingOrder.setIsPaid(true);
                        existingOrder.setPaidAt(LocalDateTime.now());
                    }
                    
                    return orderRepository.save(existingOrder);
                }).orElseThrow(() -> new ObjectNotFoundException("Order " + id + " not found!"));
    }

    private static Order getOrder(Order order) {
        Order newOrder = new Order();
        newOrder.setUser(order.getUser());
        newOrder.setIsCanceled(order.getIsCanceled());
        newOrder.setIsDelivered(order.getIsDelivered());
        newOrder.setIsPaid(order.getIsPaid());
        newOrder.setTotalPrice(order.getTotalPrice());
        newOrder.setCustomerAddress(order.getCustomerAddress());
        newOrder.setCustomerCity(order.getCustomerCity());
        newOrder.setCustomerName(order.getCustomerName());
        newOrder.setCustomerPhone(order.getCustomerPhone());
        newOrder.setCustomerCountry(order.getCustomerCountry());
        newOrder.setDiscount(order.getDiscount());
        newOrder.setDescription(order.getDescription());
        newOrder.setPaymentMethod(order.getPaymentMethod());
        newOrder.setDeliveryMethod(order.getDeliveryMethod());
        newOrder.setItemsPrice(order.getItemsPrice());
        newOrder.setShippingPrice(order.getShippingPrice());
        return newOrder;
    }
}
