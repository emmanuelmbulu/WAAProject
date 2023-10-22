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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequestMapping("bids")
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
        Product product = productService.getOneById(data.getProductId());

        Bid bid = Bid.builder()
                .createdAt(LocalDate.now())
                .customer(customer)
                .price(data.getPrice())
                .product(product)
                .build();
        bid = service.save(bid);
        return ResponseEntity.ok(bid);
    }
}