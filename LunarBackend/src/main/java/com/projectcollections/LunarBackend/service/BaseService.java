package com.projectcollections.LunarBackend.service;

import java.util.List;
import java.util.Optional;

public interface BaseService<T> {
    List<T> findAll();
    Optional<T> findById(Object id);
    T save(T entry);
}
