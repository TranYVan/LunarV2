package com.projects.LunarV3.service;

import com.projects.LunarV3.domain.model.Product;
import com.projects.LunarV3.domain.model.User;
import com.projects.LunarV3.exception.ObjectNotFoundException;
import com.projects.LunarV3.repository.ProductRepository;
import com.projects.LunarV3.utils.JsonPage;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductService {
    private final ProductRepository productRepository;

    public Product save(Product product) {
        if (productRepository.existsByName(product.getName())) {
            throw new ObjectNotFoundException(product.getName() + "has already existed");
        }
        return productRepository.save(product);
    }

    public Page<Product> findAll(int page, int size, String sortAttribute, boolean isAsc, List<String> filters) {

        if (size == -1) {
            size = Integer.MAX_VALUE;
        }

        Pageable pageable = isAsc ?
                PageRequest.of(page, size, Sort.by(sortAttribute).ascending()) :
                PageRequest.of(page, size, Sort.by(sortAttribute).descending());

        if (filters == null || filters.size() != 2) {
            return new JsonPage<Product>(productRepository.findAllByStatus(Product.Status.AVAILABLE, pageable), pageable);
        }
        System.out.println(filters);

        return switch (filters.get(0)) {
            case "name" ->
                    new JsonPage<Product>(productRepository.findAllByStatusAndNameLike(Product.Status.AVAILABLE, "%" + filters.get(1) + "%", pageable), pageable);
//                    new JsonPage<Product>(productRepository.findAllByNameLike("%" + filters.get(1) + "%", pageable), pageable);
            case "type" ->
                    new JsonPage<Product>(productRepository.findAllByStatusAndCategoryName(Product.Status.AVAILABLE, filters.get(1), pageable), pageable);
            default ->
                    new JsonPage<Product>(productRepository.findAllByStatus(Product.Status.AVAILABLE, pageable), pageable);
        };
    }

    public boolean isProductExists(UUID id) {
        return productRepository.existsById(id);
    }

    public void deleteById(UUID id) {

        if (!productRepository.existsById(id)) {
            throw new ObjectNotFoundException("Product " + id + " Not Found");
        }

        productRepository.deleteById(id);
    }

    public Product partialUpdate(UUID id, Product product) {
        product.setId(id);

        return productRepository
                .findById(id)
                .map(existingProduct -> {
                    Optional.ofNullable(product.getName()).ifPresent(existingProduct::setName);
                    Optional.ofNullable(product.getCost()).ifPresent(existingProduct::setCost);
                    Optional.ofNullable(product.getDescription()).ifPresent(existingProduct::setDescription);
                    Optional.ofNullable(product.getDiscount()).ifPresent(existingProduct::setDiscount);
                    Optional.ofNullable(product.getSoldQuantity()).ifPresent(existingProduct::setSoldQuantity);
                    Optional.ofNullable(product.getStockQuantity()).ifPresent(existingProduct::setStockQuantity);
                    Optional.ofNullable(product.getThumbnails()).ifPresent(existingProduct::setThumbnails);
                    Optional.ofNullable(product.getCategory()).ifPresent(existingProduct::setCategory);
                    Optional.ofNullable(product.getRating()).ifPresent(existingProduct::setRating);

                    return productRepository.save(existingProduct);
                }).orElseThrow(() -> new ObjectNotFoundException("Product Not Found"));
    }

    public Product findById(UUID id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty()) {
            throw new ObjectNotFoundException("Product " + id + " Not Found");
        }
        return product.get();
    }

    public void softDelete(UUID id) {
        Optional<Product> product = productRepository.findById(id);
        if (product.isEmpty()) {
            throw  new ObjectNotFoundException("Product " + id + " Not Found");
        }
        Product product1 = product.get();
        product1.setStatus(Product.Status.REMOVED);
        productRepository.save(product1);
    }

    public void softDeleteMany(List<UUID> ids) {
        try {
            List<Product> products =productRepository.findAllById(ids);
            products.forEach(product -> product.setStatus(Product.Status.REMOVED));
            productRepository.saveAll(products);
        } catch (Exception e) {
            throw e;
        }
    }
}
