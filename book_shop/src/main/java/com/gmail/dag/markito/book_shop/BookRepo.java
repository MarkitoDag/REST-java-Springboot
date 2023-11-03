package com.gmail.dag.markito.book_shop;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepo extends MongoRepository<Book, String> {

    public Book findByIsbn(String isbn);

    public List<Book> findByAuthor(String author);
}
