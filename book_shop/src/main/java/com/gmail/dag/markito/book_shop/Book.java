package com.gmail.dag.markito.book_shop;

import org.springframework.data.annotation.Id;

@org.springframework.data.mongodb.core.mapping.Document(collection = "book")
public class Book {
    @Id
    private String id;
    private String isbn;
    private String author;
    private String title;
    private double price;
    private String description;
    private double original_price;
    private int quantity;
    private String date;
    private String publisher;
    private String image;
    private String insertDate;
    private int visit;
    private int buy;

    public Book() {
    }

    public Book(String author, String title, String isbn, double price, String description, double original_price,
            int quantity, String date, String publisher, String image) {
        this.author = author;
        this.title = title;
        this.isbn = isbn;
        this.price = price;
        this.description = description;
        this.original_price = original_price;
        this.quantity = quantity;
        this.date = date;
        this.publisher = publisher;
        this.image = image;
        this.insertDate = "01-04-2023";

    }

    // public Document toDocument() {
    // Document bookDocument = new Document("_id", new ObjectId());
    // bookDocument.append("author", this.author);
    // bookDocument.append("title", this.title);
    // bookDocument.append("isbn", this.isbn);
    // bookDocument.append("price", this.price);
    // bookDocument.append("description", this.description);
    // bookDocument.append("original_price", this.original_price);
    // bookDocument.append("quantity", this.quantity);
    // return bookDocument;
    // }

    public void setBuy(int buy) {
        this.buy = buy;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public void setVisit(int visit) {
        this.visit = visit;
    }

    public int getBuy() {
        return buy;
    }

    public String getDate() {
        return date;
    }

    public String getId() {
        return id;
    }

    public String getImage() {
        return image;
    }

    public String getInsertDate() {
        return insertDate;
    }

    public String getPublisher() {
        return publisher;
    }

    public int getVisit() {
        return visit;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getQuantity() {
        return quantity;
    }

    public double getOriginal_price() {
        return original_price;
    }

    public void setOriginal_price(double original_price) {
        this.original_price = original_price;
    }

    public double getPrice() {
        return price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getAuthor() {
        return author;
    }

    public String getTitle() {
        return title;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Override
    public String toString() {
        return String.format(
                "Book[isbn=%s, author='%s', title='%s', description='%s', price='%f', original_price='%f', quantity='%d']",
                isbn, author, title, description, price, original_price, quantity);
    }
}