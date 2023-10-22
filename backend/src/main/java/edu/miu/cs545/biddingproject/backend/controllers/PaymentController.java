package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.domains.Payment;
import edu.miu.cs545.biddingproject.backend.domains.PaymentType;
import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.queries.ApiBodyForError;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewPayment;
import edu.miu.cs545.biddingproject.backend.services.CustomerService;
import edu.miu.cs545.biddingproject.backend.services.PaymentService;
import edu.miu.cs545.biddingproject.backend.services.ProductService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("payments")
public class PaymentController {
    final private PaymentService service;
    final private CustomerService customerService;
    final private ProductService productService;

    public PaymentController(@Qualifier("paymentServiceImpl") PaymentService service,
                             CustomerService customerService,
                             ProductService productService) {
        this.service = service;
        this.customerService = customerService;
        this.productService = productService;
    }

    @GetMapping("/deposits")
    public ResponseEntity<?> getDepositMadeByCustomerForProduct(
            @RequestParam(name = "cust") Long customerId,
            @RequestParam(name = "prod") Long productId
    ) {
        if(customerId == null || customerId == 0) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the customer's reference"));
        }
        if(productId == null || productId == 0) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the product's reference"));
        }
        Customer customer = customerService.getOneById(customerId);
        if(customer == null) {
            return ResponseEntity.notFound().build();
        }
        Product product = productService.getOneById(productId);
        if(product == null) return ResponseEntity.notFound().build();

        Payment payment = service.getDepositPaymentByCustomerAndProduct(customer, product);
        if(payment == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(payment);
    }

    @PostMapping("/deposits")
    public ResponseEntity<?> createDeposit(@RequestBody DataForNewPayment data) {
        Customer customer = customerService.getOneById(data.getCustomerId());
        if(customer == null) return ResponseEntity.notFound().build();

        Product product = productService.getOneById(data.getProductId());
        if(product == null) return ResponseEntity.notFound().build();

        if(data.getAmount() == 0) return ResponseEntity.badRequest()
                .body(ApiBodyForError.builder()
                        .code(1).message("Please provide the deposit amount paid."));

        if(product.getDepositAmount() > data.getAmount()) return ResponseEntity.badRequest()
                .body(ApiBodyForError.builder()
                        .code(1).message("Sorry, the deposit amount provided is not enough."));

        Payment payment = Payment.builder()
                .paymentType(PaymentType.DEPOSIT)
                .amount(data.getAmount())
                .customer(customer)
                .payedAt(LocalDate.now())
                .product(product)
                .build();
        payment = service.save(payment);
        return ResponseEntity.ok(payment);
    }
}
