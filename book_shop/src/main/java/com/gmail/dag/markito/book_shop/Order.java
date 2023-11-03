package com.gmail.dag.markito.book_shop;

import java.sql.Date;
import java.text.SimpleDateFormat;

import java.util.UUID;

import org.springframework.data.annotation.Id;

@org.springframework.data.mongodb.core.mapping.Document(collection = "orders")
public class Order {
    @Id
    private String id;
    String email;
    private Cart carts;
    private String date;
    private Double total;
    private Double subtotal;
    private Double tax;

    public Order(String email, Cart carts, Double total) {
        this.id = UUID.randomUUID().toString();
        this.email = email;
        this.carts = carts;
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd 'at' HH:mm:ss z");
        Date date = new Date(System.currentTimeMillis());
        this.date = formatter.format(date);
        this.total = total;
        Double temp = (total * 22) / 100;
        Double number = (double) Math.round(temp * 100);
        number = number / 100;
        this.tax = number;
        temp = total - (total * 22) / 100;
        number = (double) Math.round(temp * 100);
        number = number / 100;
        this.subtotal = number;
    }

    public Double getSubtotal() {
        return subtotal;
    }

    public Double getTax() {
        return tax;
    }

    public Double getTotal() {
        return total;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setTax(Double tax) {
        this.tax = tax;
    }

    public void setSubtotal(Double subtotal) {
        this.subtotal = subtotal;
    }

    public void setTotal(Double total) {
        this.total = total;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDate() {
        return date;
    }

    public Cart getCarts() {
        return carts;
    }

    public void setCarts(Cart carts) {
        this.carts = carts;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {

        return "id: " + this.id + "\nBooks: \n" + "Date: " + this.date;
    }
}