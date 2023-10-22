package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewProduct;
import edu.miu.cs545.biddingproject.backend.services.BidService;
import edu.miu.cs545.biddingproject.backend.services.ProductService;
import edu.miu.cs545.biddingproject.backend.services.SellerService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("products")
public class ProductController {

    final private ProductService service;
    final private SellerService sellerService;
    final private BidService bidService;

    public ProductController( @Qualifier("productServiceImpl") ProductService service,
                              SellerService sellerService,
                              BidService bidService) {
        this.service = service;
        this.sellerService = sellerService;
        this.bidService = bidService;
    }

    @GetMapping("")
    public List<Product> getAllProducts(@RequestParam(name = "filter") String filter) {
        if(filter == null || filter.isEmpty()) return new ArrayList<>();
        if("all".equalsIgnoreCase(filter)) return service.getAllProducts();
        return new ArrayList<>();
    }

    @GetMapping("")
    public  List<Product> getAllProductsAvailableForBidding() {
        return service.getAllProductsAvailableForBidding();
    }

    @PostMapping("")
    public ResponseEntity<?> createProduct(@RequestBody DataForNewProduct data) {
        Seller seller = sellerService.getOneById(data.getSellerId());
        Product product = Product.builder()
                .biddingPrice(data.getBiddingPrice())
                .description(data.getDescription())
                .name(data.getName())
                .depositAmount(data.getDepositAmount())
                .seller(seller)
                .isSavedWithRelease(data.isSavedWithRelease())
                .build();
        product = service.save(product);
        return ResponseEntity.ok(product);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOneProduct(@PathVariable Long id) {
        Product product = service.getOneById(id);
        if(product == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(product);
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
