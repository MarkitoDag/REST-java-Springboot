package com.gmail.dag.markito.book_shop;

import java.util.List;

public class Books {
    private List<String> bookCollection;

    public Books() {
    }

    public Books(List<String> bs) {
        this.bookCollection = bs;
    }

    public List<String> getCollection() {
        return bookCollection;
    }

    public void setCollection(List<String> c) {
        bookCollection = c;
    }

    public String toString() {
        return bookCollection.toString();
    }

}