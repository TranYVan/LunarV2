package com.projectcollections.LunarBackend.mapper.impl;

import com.projectcollections.LunarBackend.domain.dto.ProductDto;
import com.projectcollections.LunarBackend.domain.dto.UserDto;
import com.projectcollections.LunarBackend.domain.model.Product;
import com.projectcollections.LunarBackend.domain.model.User;
import com.projectcollections.LunarBackend.mapper.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class ProductMapper implements Mapper<Product, ProductDto> {

    private final ModelMapper modelMapper;

    @Override
    public ProductDto mapTo(Product product) {
        return modelMapper.map(product, ProductDto.class);
    }

    @Override
    public Product mapFrom(ProductDto productDto) {
        return modelMapper.map(productDto, Product.class);
    }
}
