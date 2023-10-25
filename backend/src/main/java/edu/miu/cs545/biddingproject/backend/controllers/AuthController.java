package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.domains.User;
import edu.miu.cs545.biddingproject.backend.domains.UserRole;
import edu.miu.cs545.biddingproject.backend.queries.ApiBodyForAuthentication;
import edu.miu.cs545.biddingproject.backend.queries.ApiBodyForError;
import edu.miu.cs545.biddingproject.backend.services.CustomerService;
import edu.miu.cs545.biddingproject.backend.services.SellerService;
import edu.miu.cs545.biddingproject.backend.services.UserService;
import edu.miu.cs545.biddingproject.backend.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@CrossOrigin
public class AuthController {
    private final AuthenticationManager authenticationManager;
    final private JwtUtil jwtUtil;
    final private UserService service;
    final private CustomerService customerService;
    final private SellerService sellerService;

    public AuthController(AuthenticationManager manager, JwtUtil jwtUtil,
                          @Qualifier("userServiceImplementation") UserService service,
                          SellerService sellerService, CustomerService customerService) {
        this.authenticationManager = manager;
        this.service = service;
        this.jwtUtil = jwtUtil;
        this.sellerService = sellerService;
        this.customerService = customerService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            System.out.println("USER ");
            System.out.println(user);
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            user.getUsername(), user.getPassword()
                    )
            );
            user = (User) authentication.getPrincipal();
            final String token = jwtUtil.generateAccessToken(user);

            final LocalDateTime expirationDate = LocalDateTime.now().plusHours(1);

            Long userId = 0L;
            UserRole role = user.getRole();
            if(role == UserRole.CUSTOMER) {
                Customer customer = customerService.getCustomerRelatedToUser(user);
                if(customer == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

                userId = customer.getId();
            } else if(role == UserRole.SELLER) {
                Seller seller = sellerService.getSellerRelatedToUser(user);
                if(seller == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

                userId = seller.getId();
            } else return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

            return ResponseEntity.ok(
                    ApiBodyForAuthentication.builder()
                            .token(token).userId(userId)
                            .tokenExpirationDate(expirationDate)
                            .build()
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody ApiBodyForAuthentication data) {
        if(data == null) return ResponseEntity.badRequest().body(
                ApiBodyForError.builder()
                        .code(1).message("No data found for logging out.")
                        .build()
        );

        String token = data.getToken();
        jwtUtil.invalidateToken(token);
        return ResponseEntity.ok(ApiBodyForError.builder()
                .code(0).message("Logout successfully!")
                .build());
    }

}
