package com.gmail.dag.markito.book_shop;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.data.mongodb.core.MongoTemplate;

import org.yaml.snakeyaml.external.biz.base64Coder.Base64Coder;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;

import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;

@Consumes("application/json")
@Produces("application/json")
@Path("/books")
// @CrossOrigin(origins = "http://127.0.0.1:5500")
public class BookService {
    @Autowired
    private BookRepo bookRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    public BookService() {
    }

    @GET
    public List<Book> getBookList() {
        // return new Books(new ArrayList<String>(bookCollection.keySet()));
        return (ArrayList<Book>) bookRepo.findAll();
    }

    // @GET
    // @Path("s={sort}&direction={dir}")
    // public List<Book> getBookListPafinated(@PathParam("sort") String page,
    // @PathParam("sort") String sort) {
    // ArrayList<Book> books = (ArrayList<Book>) bookRepo.findAll();

    // Collections.sort(books, new Comparator<Book>() {
    // @Override
    // public int compare(Book arg0, Book arg1) {
    // return arg0.getPrice() > arg1.getPrice() ? 0 : 1;
    // }
    // });
    // return books;
    // }

    @GET
    @Path("{isbn}")
    public Book getBookDetails(@PathParam("isbn") String isbn) {
        // return bookCollection.get(isbn);
        Book book = bookRepo.findByIsbn(isbn);
        int visit = book.getVisit();
        visit++;
        book.setVisit(visit);
        bookRepo.save(book);

        return book;
    }

    @DELETE
    @Path("admin/{isbn}")
    public Response deleteBook(@PathParam("isbn") String isbn) {
        try {
            bookRepo.delete(bookRepo.findByIsbn(isbn));

            return Response.ok().build();
        } catch (Error e) {
            return Response.serverError().build();
        }

    }

    @POST
    @Path("admin/new_book")
    public Response createNewBook(Book book) {
        // bookCollection.put(book.getIsbn(), book);
        Book temp = null;
        temp = bookRepo.findByIsbn(book.getIsbn());
        if (temp != null) {

            Response unauthorized = Response.status(Response.Status.CONFLICT)
                    .entity("L'isbn del libro è già presente nel database!").build();
            return unauthorized;
        }
        bookRepo.save(book);
        URI uri = null;
        try {
            uri = new URI("/books/" + book.getIsbn());
            return Response.created(uri).build();
        } catch (URISyntaxException e) {
            return Response.notModified().build();
        }
    }

    @POST
    @Path("admin/new_books")
    public Response createNewBooks(List<Book> books) {
        // bookCollection.put(book.getIsbn(), book);
        String uri = "books/";
        for (Book book : books) {
            bookRepo.save(book);

            uri = book.getIsbn().toString() + "+";

        }
        URI u = null;
        try {
            u = new URI(uri);
            return Response.created(u).build();
        } catch (URISyntaxException e) {
            return Response.notModified().build();
        }

    }

    @POST
    @Path("admin/mod_book/{isbn}")
    public Response modifyBook(@PathParam("isbn") String isbn, Book book) {

        // bookCollection.remove(book.getIsbn());
        // bookCollection.put(book.getIsbn(), book);
        URI uri = null;
        try {
            bookRepo.delete(bookRepo.findByIsbn(isbn));
            bookRepo.save(book);
            uri = new URI("/books/" + book.getIsbn());
            return Response.created(uri).build();
        } catch (URISyntaxException e) {
            return Response.notModified().build();
        }
    }

    @POST
    @Path("secured/add-to-cart/{str}/{codice}")
    public Response addToCart(@PathParam("str") String str, @PathParam("codice") String codice) {
        String decoded = Base64Coder.decodeString(str);
        String decodedISBN = Base64Coder.decodeString(codice);
        Book b = bookRepo.findByIsbn(decodedISBN);
        BookInfoCart bif = new BookInfoCart(b, 1);
        boolean found = false;
        Cart temp = null;
        for (Cart c : cartRepo.findByEmail(decoded)) {
            if (c.getType().equals("cart")) {
                temp = c;
            }
        }
        if (temp == null) {
            ArrayList<BookInfoCart> bifs = new ArrayList<>();
            bifs.add(bif);
            Cart cart = new Cart(decoded, "cart", bifs);
            cartRepo.save(cart);
            System.out.println("ciao");
        } else {
            Cart cart = temp;
            ArrayList<BookInfoCart> bifs = cart.getBooks();
            System.out.println("ccc");
            for (BookInfoCart x : bifs) {
                System.out.println(x.getBook().getId().toString());
                System.out.println(bif.getBook().getId().toString());
                if (x.getBook().getId().toString().equals(bif.getBook().getId().toString())) {
                    x.setQuantity(x.getQuantity() + 1);
                    found = true;
                }
            }
            if (!found) {
                bifs.add(bif);
            }
            cartRepo.save(cart);
        }

        return Response.ok().build();
    }

    // @GET
    // @Path("/{isbn}/orders/{oid}")
    // public Order getOrder(@PathParam("isbn") String isbn, @PathParam("oid") int
    // oid) {
    // List<Order> list = orderCollection.get(isbn);
    // if (list != null)
    // return list.get(oid);
    // return null;
    // }
}