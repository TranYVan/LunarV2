package com.projectcollections.LunarBackend.mapper.impl;

import com.projectcollections.LunarBackend.domain.dto.UserDto;
import com.projectcollections.LunarBackend.domain.model.User;
import com.projectcollections.LunarBackend.mapper.Mapper;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Mapper<User, UserDto> {

    private ModelMapper modelMapper;

    @Override
    public UserDto mapTo(User user) {
        return modelMapper.map(user, UserDto.class);
    }

    @Override
    public User mapFrom(UserDto userDto) {
        return modelMapper.map(userDto, User.class);
    }
}
