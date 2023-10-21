package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewCustomer;
import edu.miu.cs545.biddingproject.backend.services.CustomerService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("customers")
public class CustomerController {
    final private CustomerService service;

    public CustomerController(@Qualifier("customerServiceImpl") CustomerService service) {
        this.service = service;
    }
    @PostMapping("")
    public ResponseEntity<?> createCustomer(@RequestBody DataForNewCustomer data) {

         Customer customer = Customer.builder().
                 emailAddress(data.getEmailAddress())
                 .licenseNumber(data.getLicenseNumber())
                 .name(data.getName())
                 .build();

         customer = service.save(customer);
         return ResponseEntity.ok(customer);
    }
}
