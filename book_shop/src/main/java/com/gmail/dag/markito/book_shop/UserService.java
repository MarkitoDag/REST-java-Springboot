package com.gmail.dag.markito.book_shop;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.crypto.bcrypt.BCrypt;

import org.springframework.web.bind.annotation.ResponseBody;
import org.yaml.snakeyaml.external.biz.base64Coder.Base64Coder;

import org.springframework.beans.factory.annotation.Autowired;

import jakarta.ws.rs.Consumes;
import jakarta.ws.rs.DELETE;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.PUT;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.PathParam;
import jakarta.ws.rs.Produces;
import jakarta.ws.rs.core.Response;

@Consumes("application/json")
@Produces("application/json")
@Path("users")
// @CrossOrigin(origins = "http://127.0.0.1:5500")
public class UserService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private CartRepo cartRepo;
    @Autowired
    private BookRepo bookRepo;
    @Autowired
    private OrderRepo orderRepo;

    private List<User> db = new ArrayList<User>();

    @POST
    @Path("create_new_user")
    @ResponseBody
    public Response createUser(User u) {
        if (u.getEmail().isEmpty() || u.getFirstName().isEmpty() || u.getLastName().isEmpty()
                || u.getUserName().isEmpty() || u.getPassword().isEmpty() || u.getAge() < 13 || u.getAge() > 150) {
            return Response.notAcceptable(null).build();
        }
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

        if (!EmailValidation.patternMatches(u.getEmail(), regexPattern)) {
            return Response.notAcceptable(null).build();
        }

        if (u.getPassword().length() < 6) {
            return Response.notAcceptable(null).build();
        }
        for (User user : userRepo.findAll()) {
            if (user.getEmail().equalsIgnoreCase(u.email)) {
                return Response.notAcceptable(null).build();
            }
        }
        String stronger_salt = BCrypt.gensalt(12);
        u.setPassword(BCrypt.hashpw(u.getPassword(), stronger_salt));
        userRepo.save(u);

        try {

            return Response.accepted().build();
        } catch (Error e) {

            return Response.serverError().build();
        }

    }

    @POST
    @Path("login")
    public Response login(LoginForm lf) {
        User u = userRepo.findByEmail(lf.getEmail());
        if (u.getEmail().equals(lf.getEmail()) && BCrypt.checkpw(lf.getPassword(),
                u.getPassword())) {

            return Response.ok().entity(u.isAdmin()).build();
        }

        Response unauthorized = Response.status(Response.Status.UNAUTHORIZED)
                .entity("Non sei autorizzato ad eseguire questa operazione.").build();
        return unauthorized;
    }

    @POST
    @Path("admin/create_new_admin")
    public Response createAdmin(User u) {
        if (u.getEmail().isEmpty() || u.getFirstName().isEmpty() || u.getLastName().isEmpty()
                || u.getUserName().isEmpty() || u.getPassword().isEmpty() || u.getAge() < 13 || u.getAge() > 150) {
            return Response.notAcceptable(null).build();
        }
        String regexPattern = "^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
                + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$";

        if (!EmailValidation.patternMatches(u.getEmail(), regexPattern)) {
            return Response.notAcceptable(null).build();
        }

        if (u.getPassword().length() < 12) {
            return Response.notAcceptable(null).build();
        }
        for (User user : userRepo.findAll()) {
            if (user.getEmail().equalsIgnoreCase(u.email)) {
                return Response.notAcceptable(null).build();
            }
        }
        String stronger_salt = BCrypt.gensalt(12);
        u.setPassword(BCrypt.hashpw(u.getPassword(), stronger_salt));
        u.setAdmin(true);
        userRepo.save(u);
        try {

            return Response.accepted().build();
        } catch (Error e) {

            return Response.serverError().build();
        }
    }

    // @PUT
    // @Path("/{id}")
    // public Response updateUser(@PathParam("id") int id, User u) {
    // try {
    // db.get(id).setFirstName(u.getFirstName());
    // db.get(id).setLastName(u.getLastName());
    // db.get(id).setAge(u.getAge());
    // db.get(id).setUserName(u.getUserName());
    // db.get(id).setPassword(u.getPassword());
    // return Response.created(new URI("/users/" + (db.size() - 1))).build();
    // } catch (URISyntaxException e) {
    // return Response.notModified("User not found").build();
    // }
    // }

    // @GET
    // @Path("/{id}")
    // public User getUser(@PathParam("id") int id) {
    // if (id > db.size() || id < 0)
    // return new User();
    // return (User) db.get(id);
    // }

    @GET
    @Path("/secured/email/{email2}")
    public User getUser(@PathParam("email2") String email2) {
        String decodedString = Base64Coder.decodeString(email2);

        User usr = userRepo.findByEmail(decodedString);
        if (usr != null) {

            return usr;
        }

        return null;
    }

    // @GET
    // @Path("/{firstName}+{lastName}")
    // public List<User> getUser(@PathParam("firstName") String firstName,
    // @PathParam("lastName") String LastName) {
    // List<User> temp = new ArrayList<User>();
    // for (User user : db) {
    // if (user.getFirstName().equalsIgnoreCase(firstName)) {
    // if (user.getLastName().equalsIgnoreCase(LastName)) {
    // temp.add(user);
    // }
    // }
    // }
    // return temp;
    // }
    @DELETE
    @Path("secured/remove-from-cart/{str}/{id}")
    public Response deleteItemFromCart(@PathParam("str") String str, @PathParam("id") String id) {
        String decodedID = Base64Coder.decodeString(id);
        String decodedEmail = Base64Coder.decodeString(str);
        Cart cart = null;

        for (Cart c : cartRepo.findByEmail(decodedEmail)) {
            if (c.getType().equals("cart")) {
                cart = c;
            }
        }

        if (cart == null) {
            return Response.notModified().build();
        }
        cart.removeById(decodedID);
        cartRepo.save(cart);
        return Response.ok().build();
    }

    // @PUT
    // @Path("secured/set-quantity/{str}/{id}/{i}")
    // public Response adjustQuantity(@PathParam("str") String str, @PathParam("id")
    // String id, @PathParam("i") int i) {
    // String decodedID = Base64Coder.decodeString(id);

    // Optional<Cart> temp = cartRepo.findById(decodedID);
    // if (temp == null) {
    // return Response.notModified().build();
    // }
    // Cart cart = temp.get();
    // cart.setQuantity(i);
    // cartRepo.save(cart);
    // return Response.ok().build();
    // }

    // @GET
    // @Path("secured/view-cart/{str}")
    // public String getCartCSV(@PathParam("str") String str) {
    // String decoded = Base64Coder.decodeString(str);
    // String csv = "";
    // Book b = null;
    // Optional<Book> temp;
    // for (Cart c : cartRepo.findByEmail(decoded)) {
    // if (c.getType().equals("cart")) {
    // temp = bookRepo.findById(c.getBookID());
    // if (temp != null) {
    // b = temp.get();
    // double number = b.getPrice() * c.getQuantity();

    // number = Math.round(number * 100);
    // number = number / 100;
    // csv += b.getImage() + "," + b.getTitle() + "," + b.getAuthor() + "," +
    // b.getIsbn() + ","
    // + String.valueOf(b.getPrice()) + "," + String.valueOf(c.getQuantity()) + ","
    // + String.valueOf(number) + "," + c.getId() + ";";
    // }
    // }
    // }
    // return (csv == null || csv.length() == 0)
    // ? ""
    // : (csv.substring(0, csv.length() - 1));

    // }
    @GET
    @Path("secured/view-cart/{str}")
    public Cart getCart(@PathParam("str") String str) {
        String decoded = Base64Coder.decodeString(str);
        Cart cart = null;
        for (Cart c : cartRepo.findByEmail(decoded)) {
            if (c.getType().equals("cart")) {
                cart = c;
            }
        }

        return cart;
    }

    @GET
    @Path("secured/view-cart/{str}/badge")
    public int countCartItems(@PathParam("str") String str) {
        String decoded = Base64Coder.decodeString(str);
        int count = 0;

        for (Cart c : cartRepo.findByEmail(decoded)) {
            if (c.getType().equals("cart")) {
                for (BookInfoCart bif : c.getBooks()) {
                    count += bif.getQuantity();
                }
            }
        }

        return count;
    }

    @POST
    @Path("secured/purchase/{str}")
    public Response purchase(@PathParam("str") String str) {
        Cart cart = null;
        String decoded = Base64Coder.decodeString(str);
        for (Cart c : cartRepo.findByEmail(decoded)) {
            if (c.getType().equals("cart")) {
                cart = c;
            }
        }

        if (cart == null) {
            Response unauthorized = Response.status(Response.Status.BAD_REQUEST)
                    .entity("Qualcosa è andato storto!\nNon ho trovato il tuo carello.").build();
            return unauthorized;
        }
        Double total = 0.0;
        for (BookInfoCart b : cart.getBooks()) {
            if (b.getBook().getQuantity() < 1 || b.getBook().getQuantity() < b.getQuantity()) {
                Response unauthorized = Response.status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity("Spiacenti ma il libro: " + b.getBook().getIsbn()
                                + " è terminato.\nNon è possibile concludere l'aquisto fino a quando non saranno rifornite le scorte.")
                        .build();
                return unauthorized;
            }
            total += b.getBook().getPrice() * b.getQuantity();
            b.getBook().setBuy(b.getBook().getBuy() + 1);
            b.getBook().setQuantity(b.getBook().getQuantity() - b.getQuantity());
            bookRepo.save(b.getBook());
        }
        Order order = new Order(decoded, cart, total);

        orderRepo.save(order);

        cartRepo.delete(cart);
        return Response.ok().build();
    }

    @GET
    @Path("secured/view_order/{str}")
    public ArrayList<Order> viewOrder(@PathParam("str") String str) {
        String decoded = Base64Coder.decodeString(str);
        ArrayList<Order> orders = new ArrayList<>();

        orders.addAll(orderRepo.findByEmail(decoded));

        return orders;
    }

    // @GET
    // @Path("/all")
    // public List<User> getUser() {
    // return db;
    // }
}