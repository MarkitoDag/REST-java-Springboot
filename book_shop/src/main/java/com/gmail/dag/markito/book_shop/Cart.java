package com.gmail.dag.markito.book_shop;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;

@org.springframework.data.mongodb.core.mapping.Document(collection = "cart")
public class Cart {
    @Id
    String id;
    String email;
    String type;
    ArrayList<BookInfoCart> books;

    public Cart(String email, String type, ArrayList<BookInfoCart> books) {
        this.email = email;
        this.type = type;
        this.books = books;

    }

    public void removeById(String str) {
        for (BookInfoCart bookInfoCart : books) {
            if (bookInfoCart.getBook().getId().equals(str))
                this.books.remove(bookInfoCart);
        }
    }

    public void add(BookInfoCart b) {
        this.books.add(b);
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public ArrayList<BookInfoCart> getBooks() {
        return books;
    }

    public void setBooks(ArrayList<BookInfoCart> books) {
        this.books = books;
    }

}
