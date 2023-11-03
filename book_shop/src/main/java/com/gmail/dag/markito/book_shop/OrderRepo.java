package com.gmail.dag.markito.book_shop;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepo extends MongoRepository<Order, String> {
    public List<Order> findByEmail(String email);
}
