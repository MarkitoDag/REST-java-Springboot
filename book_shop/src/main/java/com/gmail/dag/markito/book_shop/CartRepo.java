package com.gmail.dag.markito.book_shop;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface CartRepo extends MongoRepository<Cart, String> {
    public List<Cart> findByEmail(String email);
}
