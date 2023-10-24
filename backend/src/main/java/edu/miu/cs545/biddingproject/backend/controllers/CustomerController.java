package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.queries.ApiBodyForError;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewCustomer;
import edu.miu.cs545.biddingproject.backend.services.BidService;
import edu.miu.cs545.biddingproject.backend.services.CustomerService;
import edu.miu.cs545.biddingproject.backend.values.Name;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("customers")
public class CustomerController {
    final private CustomerService service;
    final private BidService bidService;

    public CustomerController(@Qualifier("customerServiceImpl") CustomerService service,
                              BidService bidService) {
        this.service = service;
        this.bidService = bidService;
    }
    @PostMapping("")
    public ResponseEntity<?> createCustomer(@RequestBody DataForNewCustomer data) {
        if(data == null) return ResponseEntity.badRequest()
                .body(ApiBodyForError.builder()
                        .code(1).message("Empty data provided for a new customer.")
                        .build());

        Customer customer = Customer.builder().
             emailAddress(data.getEmailAddress())
             .licenseNumber(data.getLicenseNumber())
             .name(data.getName())
             .build();

        Name name = customer.getName();
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
        customer.setName(name);

        String licenseNumber = customer.getLicenseNumber();
        if(licenseNumber == null || licenseNumber.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the license number.")
                            .build());
        }
        customer.setLicenseNumber(licenseNumber.trim().toLowerCase());

        String email = customer.getEmailAddress();
        if(email == null || email.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the email address.")
                            .build());
        }
        customer.setEmailAddress(email.trim().toLowerCase());

        customer = service.save(customer);
        return ResponseEntity.ok(customer);
    }

    @GetMapping("{id}/bids")
    public ResponseEntity<?> getAllBidsMadeByCustomer(@PathVariable(name = "id") Long customerId) {
        Customer customer = service.getOneById(customerId);
        if(customer == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(bidService.getAllBidsByCustomer(customer));
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getOneCustomer(@PathVariable Long id) {
        Customer customer = service.getOneById(id);
        if(customer == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(customer);
    }
}
