package com.projects.LunarV3.service;

import com.projects.LunarV3.domain.model.Order;
import com.projects.LunarV3.domain.model.OrderedItems;
import com.projects.LunarV3.domain.model.Product;
import com.projects.LunarV3.domain.model.User;
import com.projects.LunarV3.exception.InsufficientResourceException;
import com.projects.LunarV3.exception.ObjectNotFoundException;
import com.projects.LunarV3.repository.OrderRepository;
import com.projects.LunarV3.repository.ProductRepository;
import com.projects.LunarV3.repository.UserRepository;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
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
    private final EmailService emailService;

    public Order saveOrder(Order order) throws MessagingException {

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
        Optional<User> optionalUser = userRepository.findById(newOrder.getUser().getId());
        User user = optionalUser.get();
        System.out.println(newOrder.getUser());
        emailService.sendConfirmationEmail(user.getEmail(), "LUNAR - Order Confirmation", newOrder);
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

    public Order cancel(UUID id) {
        Optional<Order> optionalOrder = orderRepository.findById(id);
        if (optionalOrder.isEmpty()) {
            throw new ObjectNotFoundException("Order " + id + " not found");
        }

        Order order = optionalOrder.get();

        if (order.getIsCanceled()) {
            return order;
        }

        order.setIsCanceled(true);
        order.setCanceledAt(LocalDateTime.now());
        order.getOrderedItems().forEach(it -> {
            Product product = it.getProduct();
            product.setStockQuantity(product.getStockQuantity() + it.getAmount());
            product.setSoldQuantity(product.getSoldQuantity() - it.getAmount());
            productRepository.save(product);
        });
        return orderRepository.save(order);

//        Optional<Order> optionalOrder = orderRepository.
//        System.out.println("iid" + id);
//        Optional<Order> o = orderRepository.findById(id);
//        if (o.isPresent()) {
//            System.out.println(o.get());
//        }
//        return orderRepository
//                .findById(id)
//                .map(existingOrder -> {
//                    System.out.println(existingOrder);
//                    if (!existingOrder.getIsCanceled()) {
//                        return existingOrder;
//                    }
//
//                    existingOrder.setIsCanceled(true);
//                    existingOrder.setCanceledAt(LocalDateTime.now());
//                    existingOrder.getOrderedItems().forEach(it -> {
//                        Product product = it.getProduct();
//                        product.setStockQuantity(product.getStockQuantity() + it.getAmount());
//                        product.setSoldQuantity(product.getSoldQuantity() - it.getAmount());
//                        productRepository.save(product);
//                    });
//                    return orderRepository.save(existingOrder);
//                }).orElseThrow(() -> new ObjectNotFoundException("Order " + id + " not found"));
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
