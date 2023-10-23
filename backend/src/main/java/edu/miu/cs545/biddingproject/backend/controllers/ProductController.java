package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.queries.ApiBodyForError;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewProduct;
import edu.miu.cs545.biddingproject.backend.services.BidService;
import edu.miu.cs545.biddingproject.backend.services.FileUploadService;
import edu.miu.cs545.biddingproject.backend.services.ProductService;
import edu.miu.cs545.biddingproject.backend.services.SellerService;
import edu.miu.cs545.biddingproject.backend.values.BiddingPrice;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {

    final private ProductService service;
    final private SellerService sellerService;
    final private BidService bidService;

    final private FileUploadService fileUploadService;

    public ProductController( @Qualifier("productServiceImpl") ProductService service,
                              SellerService sellerService,
                              BidService bidService,
                              FileUploadService fileUploadService) {
        this.service = service;
        this.sellerService = sellerService;
        this.bidService = bidService;
        this.fileUploadService = fileUploadService;
    }

    @GetMapping("")
    public List<Product> getAllProducts(@RequestParam(name = "filter", required = false) String filter) {
        if(filter == null || filter.isEmpty()) return service.getAllProductsAvailableForBidding();
        if("all".equalsIgnoreCase(filter)) return service.getAllProducts();
        return new ArrayList<>();
    }

    @PostMapping("")
    public ResponseEntity<?> createProduct(@RequestBody DataForNewProduct data) {
        Seller seller = sellerService.getOneById(data.getSellerId());
        if(seller == null) {
            return ResponseEntity.notFound().build();
        }

        Product product = Product.builder()
                .biddingPrice(data.getBiddingPrice())
                .description(data.getDescription())
                .name(data.getName())
                .depositAmount(data.getDepositAmount())
                .seller(seller)
                .savedWithRelease(data.isSavedWithRelease())
                .build();

        String name = product.getName();
        if(name == null || name.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the product name.")
                            .build());
        }
        product.setName(name.trim());

        String description = product.getDescription();
        if(description == null || description.trim().isEmpty()) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the product description.")
                            .build());
        }
        product.setDescription(description.trim());

        BiddingPrice biddingPrice = product.getBiddingPrice();
        if(biddingPrice == null) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide bidding information")
                            .build());
        }

        if(biddingPrice.getPrice() == 0) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide a valid product starting price")
                            .build());
        }

        LocalDate endingTime = biddingPrice.getEndingTime();
        if(endingTime == null || endingTime.isEqual(LocalDate.MIN)) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide the bidding ending time.")
                            .build());
        }
        if(endingTime.isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("The bidding ending time can not be in the past.")
                            .build());
        }

        LocalDate paymentDueDate = biddingPrice.getPaymentDueDate();
        if(paymentDueDate == null || paymentDueDate.isEqual(LocalDate.MIN)) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("Please provide a valid payment due date.")
                            .build());
        }
        if(paymentDueDate.isBefore(LocalDate.now())) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1).message("The payment due date can not be in the past.")
                            .build());
        }
        if(paymentDueDate.isBefore(endingTime) || paymentDueDate.isEqual(endingTime)) {
            return ResponseEntity.badRequest()
                    .body(ApiBodyForError.builder()
                            .code(1)
                            .message("The payment due date can not be before the bidding ending time.")
                            .build());
        }

        if(product.getDepositAmount() == 0) {
            product.setDepositAmount(product.getBiddingPrice().getPrice() / 10);
        }

        product = service.save(product);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneProduct(@PathVariable Long id) {
        Product product = service.getOneById(id);
        if(product == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(product);
    }

    @PostMapping(value = "/{id}", consumes = "multipart/form-data")
    public ResponseEntity<?> uploadProductPicture(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        Product product = service.getOneById(id);
        if(product == null) return ResponseEntity.notFound().build();

        System.out.println(file.getOriginalFilename());

        try {
            String fileName = fileUploadService.saveFile(file);
            product.setPictureUri(fileName);
            service.save(product);
            return ResponseEntity.ok(product);
        } catch (UncheckedIOException e) {
            return ResponseEntity.internalServerError().build();
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/{id}/bids")
    public ResponseEntity<?> getAllBidsForProduct(@PathVariable Long id) {
        Product product = service.getOneById(id);
        if(product == null) return ResponseEntity.notFound().build();

        return ResponseEntity.ok(bidService.getAllBidsByProduct(product));
    }

    @GetMapping("/{id}/bids/latest")
    public ResponseEntity<?> getTheLatestBidForProduct(@PathVariable Long id) {
        Product product = service.getOneById(id);
        if(product == null) return ResponseEntity.notFound().build();

        Bid latestBid = bidService.getTheLatestBidByProduct(product);
        if(latestBid == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(latestBid);
    }
}
