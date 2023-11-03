package com.gmail.dag.markito.book_shop;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    public User findByEmail(String email);

    public User findByUserName(String userName);
}
