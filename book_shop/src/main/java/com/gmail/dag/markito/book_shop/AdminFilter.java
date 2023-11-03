package com.gmail.dag.markito.book_shop;

import java.io.IOException;

import java.util.List;
import java.util.StringTokenizer;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.yaml.snakeyaml.external.biz.base64Coder.Base64Coder;

import java.lang.String;
import jakarta.ws.rs.container.ContainerRequestContext;
import jakarta.ws.rs.container.ContainerRequestFilter;
import jakarta.ws.rs.core.Response;
import jakarta.ws.rs.ext.Provider;

@Provider
public class AdminFilter implements ContainerRequestFilter {
    private static final String AUTHORIZATION_HEADER_KEY = "Authorization";
    private static final String AUTHORIZATION_HEADER_PREFIX = "Basic ";
    private static final String ADMIN_URL_PREFIX = "/admin";
    private static final String SECURED_URL_PREFIX = "/secured";
    @Autowired
    private UserRepository userRepo;

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {

        if (requestContext.getUriInfo().getPath().contains(ADMIN_URL_PREFIX)) {

            List<String> authHeader = requestContext.getHeaders().get(AUTHORIZATION_HEADER_KEY);

            if (authHeader != null && authHeader.size() > 0) {

                String authToken = authHeader.get(0);
                authToken = authToken.replaceFirst(AUTHORIZATION_HEADER_PREFIX, "");
                String decodedString = Base64Coder.decodeString(authToken);
                StringTokenizer tokenizer = new StringTokenizer(decodedString, ":");
                String email = tokenizer.nextToken();
                String password = tokenizer.nextToken();
                User usr = userRepo.findByEmail(email);

                if (usr != null) {

                    if (BCrypt.checkpw(password,
                            usr.getPassword()) && usr.isAdmin()) {

                        return;
                    }

                }

            }

            Response unauthorized = Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Non sei autorizzato ad eseguire questa operazione.").build();
            requestContext.abortWith(unauthorized);
        }
        if (requestContext.getUriInfo().getPath().contains(SECURED_URL_PREFIX)) {

            StringTokenizer tokenizer3 = new StringTokenizer(requestContext.getUriInfo().getPath(), "/");
            tokenizer3.nextToken();
            tokenizer3.nextToken();
            tokenizer3.nextToken();
            String matchedEmail = Base64Coder.decodeString(tokenizer3.nextToken());

            List<String> authHeader2 = requestContext.getHeaders().get(AUTHORIZATION_HEADER_KEY);
            if (authHeader2 != null && authHeader2.size() > 0) {

                String authToken2 = authHeader2.get(0);
                authToken2 = authToken2.replaceFirst(AUTHORIZATION_HEADER_PREFIX, "");
                String decodedString2 = Base64Coder.decodeString(authToken2);
                StringTokenizer tokenizer2 = new StringTokenizer(decodedString2, ":");
                String email2 = tokenizer2.nextToken();
                String password2 = tokenizer2.nextToken();
                if (matchedEmail.equals(email2)) {
                    User usr2 = userRepo.findByEmail(email2);

                    if (usr2 != null) {
                        if (BCrypt.checkpw(password2,
                                usr2.getPassword())) {
                            System.out.println();
                            System.out.println();
                            System.out.println();
                            System.out.println("accesso consentito");
                            System.out.println();
                            System.out.println();

                            return;
                        }
                        System.out.println();
                        System.out.println();
                        System.out.println();
                        System.out.println("user null");
                        System.out.println();
                        System.out.println();
                    }
                    System.out.println();
                    System.out.println();
                    System.out.println();
                    System.out.println("email non corrispondono");
                    System.out.println();
                    System.out.println();

                }

            }
            Response unauthorized = Response.status(Response.Status.UNAUTHORIZED)
                    .entity("Non sei autorizzato ad eseguire questa operazione.").build();
            requestContext.abortWith(unauthorized);
        }
    }

}
