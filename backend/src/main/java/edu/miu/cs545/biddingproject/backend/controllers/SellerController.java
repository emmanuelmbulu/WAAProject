package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.queries.ApiBodyForError;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewSeller;
import edu.miu.cs545.biddingproject.backend.services.ProductService;
import edu.miu.cs545.biddingproject.backend.services.SellerService;
import edu.miu.cs545.biddingproject.backend.values.Address;
import edu.miu.cs545.biddingproject.backend.values.Name;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("sellers")
public class SellerController {
    final private SellerService service;
    final private ProductService productService;

    public SellerController(@Qualifier("sellerServiceImpl") SellerService service,
                            ProductService productService) {
        this.service = service;
        this.productService = productService;
    }

    @PostMapping("")
    public ResponseEntity<?> registerSeller(@RequestBody DataForNewSeller data) {
        if(data == null) return ResponseEntity.badRequest()
                .body(ApiBodyForError.builder()
                        .code(1).message("Empty data provided for a new seller.")
                        .build());

        Seller seller = Seller.builder()
                .address(data.getAddress())
                .name(data.getName())
                .emailAddress(data.getEmailAddress())
                .build();

        Name name = seller.getName();
        if(name == null) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide your full name.")
                            .build());
        }

        String firstName = name.getFirstName();
        if(firstName == null || firstName.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide your firstname.")
                            .build());
        }
        name.setFirstName(firstName.trim());

        String lastName = name.getLastName();
        if(lastName == null || lastName.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide your lastname.")
                            .build());
        }
        name.setLastName(lastName.trim());
        seller.setName(name);

        Address address = seller.getAddress();
        if(address == null) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide a valid address")
                            .build());
        }

        String street = address.getStreet();
        if(street == null || street.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide a valid address street")
                            .build());
        }
        address.setStreet(street.trim());

        String state = address.getState();
        if(state == null || state.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the state.")
                            .build());
        }
        address.setState(state.trim());

        String city = address.getCity();
        if(city == null || city.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the city.")
                            .build());
        }
        address.setCity(city.trim());

        String zip = address.getZipCode();
        if(zip == null || zip.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the zip code.")
                            .build());
        }
        address.setZipCode(zip.trim());
        seller.setAddress(address);

        String email = seller.getEmailAddress();
        if(email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the email address.")
                            .build());
        }
        seller.setEmailAddress(email.trim().toLowerCase());

        /***
         * TODO: ADD USER CREATION
         */
        seller = service.save(seller);
        return ResponseEntity.ok(seller);
    }

    @GetMapping("{id}/products")
    public ResponseEntity<?> getAllProductsForSeller(@PathVariable(name = "id") Long sellerId) {
        Seller seller = service.getOneById(sellerId);
        if(seller == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(productService.getAllProductsBySeller(seller));
    }
}
