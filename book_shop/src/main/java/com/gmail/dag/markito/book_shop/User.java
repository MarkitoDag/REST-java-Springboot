package com.gmail.dag.markito.book_shop;

import org.bson.Document;

import org.springframework.data.annotation.Id;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@org.springframework.data.mongodb.core.mapping.Document(collection = "user")
public class User {

    @Id
    private String id;
    String email;
    private String firstName;
    private String lastName;
    private int age;
    private String userName;
    private String password;
    private boolean isAdmin;
    // private Cart cart = new Cart();
    // private Cart saveForLater = new Cart();
    // private List<Order> orders = new ArrayList<Order>();

    public User() {
    }

    public User(String email, String firstName, String lastName, int age, String username, String password) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.userName = username;
        this.password = password;
        this.isAdmin = false;
    }

    // public void placeOrder(String cartid) {
    // Order order = new Order(this.email, cartid);
    // orderRepo.save(order);
    // }

    public Document toDoc() {
        Document doc = new Document();
        doc.append("firstName", firstName);
        doc.append("lastName", lastName);
        doc.append("age", age);
        doc.append("userName", userName);
        doc.append("password", password);
        doc.append("isAdmin", isAdmin);
        return doc;
    }

    public String getEmail() {
        return email;
    }

    public String getId() {
        return id;
    }

    // public List<Order> getOrders() {
    // return orders;
    // }

    // public Cart getCart() {
    // return cart;
    // }

    // public void setCart(Cart cart) {
    // this.cart = cart;
    // }

    // public Cart getSaveForLater() {
    // return saveForLater;
    // }

    // public void setSaveForLater(Cart saveForLater) {
    // this.saveForLater = saveForLater;
    // }

    // public void addOrder(Order o) {
    // this.orders.add(o);
    // }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setId(String id) {
        this.id = id;
    }

    // public void setOrders(List<Order> orders) {
    // this.orders = orders;
    // }

    public void setAdmin(boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public boolean isAdmin() {
        return isAdmin;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public int getAge() {
        return age;
    }

    public String getPassword() {
        return password;
    }

    public String getUserName() {
        return userName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String toString() {
        return firstName + " " + lastName + " " + age + " " + userName;
    }

    public String toJson(User u) {
        ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
        try {
            return ow.writeValueAsString(u);
        } catch (JsonProcessingException e) {

            e.printStackTrace();
            return "";
        }
    }
}
