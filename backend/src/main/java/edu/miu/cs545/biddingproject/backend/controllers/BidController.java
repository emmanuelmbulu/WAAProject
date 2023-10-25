package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewBid;
import edu.miu.cs545.biddingproject.backend.services.BidService;
import edu.miu.cs545.biddingproject.backend.services.CustomerService;
import edu.miu.cs545.biddingproject.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@RestController
@RequestMapping("bids")
@CrossOrigin
public class BidController {
    final private BidService service;
    final private ProductService productService;
    final private CustomerService customerService;

    public BidController(@Qualifier("bidServiceImpl") BidService service,
                         ProductService productService,
                         CustomerService customerService) {
        this.service = service;
        this.productService = productService;
        this.customerService = customerService;
    }

    @PostMapping("")
    public ResponseEntity<?> createBid(@RequestBody DataForNewBid data) {
        Customer customer = customerService.getOneById(data.getCustomerId());
        if(customer == null) return ResponseEntity.notFound().build();

        Product product = productService.getOneById(data.getProductId());
        if(product == null) return ResponseEntity.notFound().build();

        Bid bid = Bid.builder()
                .createdAt(LocalDateTime.now())
                .customer(customer)
                .price(data.getPrice())
                .product(product)
                .build();
        bid = service.save(bid);
        return ResponseEntity.ok(bid);
    }
}
