package com.projectcollections.LunarBackend.mapper.impl;

import com.projectcollections.LunarBackend.domain.dto.CategoryDto;
import com.projectcollections.LunarBackend.domain.model.Category;
import com.projectcollections.LunarBackend.mapper.Mapper;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class CategoryMapper implements Mapper<Category, CategoryDto> {

    private final ModelMapper modelMapper;
    @Override
    public CategoryDto mapTo(Category category) {
        return modelMapper.map(category, CategoryDto.class);
    }

    @Override
    public Category mapFrom(CategoryDto categoryDto) {
        return modelMapper.map(categoryDto, Category.class);
    }
}
