package com.projects.LunarV3.controller;

import com.fasterxml.jackson.annotation.JsonView;
import com.projects.LunarV3.domain.Views;
import com.projects.LunarV3.domain.model.Order;
import com.projects.LunarV3.exception.ObjectNotFoundException;
import com.projects.LunarV3.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @PostMapping
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> create(@RequestBody @JsonView(Views.InternalView.class) Order order) {
        return ResponseEntity.status(HttpStatus.CREATED).body(orderService.saveOrder(order));
    }

    @GetMapping
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(orderService.getAll());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/get-by-user-id/{id}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getAllByUserId(@PathVariable Long id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(orderService.getAllByUser(id));
        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/details/{id}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> getDetail(@PathVariable UUID id) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(orderService.getDetail(id));
        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    @JsonView(Views.ExternalView.class)
    public ResponseEntity<?> update(
            @PathVariable UUID id, @RequestBody
            @JsonView(Views.UpdateView.class) Order order) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(orderService.update(id, order));
        } catch (ObjectNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
