package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewProduct;
import edu.miu.cs545.biddingproject.backend.services.ProductService;
import edu.miu.cs545.biddingproject.backend.services.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("products")
public class ProductController {

    final private ProductService service;
    final private SellerService sellerService;

    public ProductController( @Qualifier("productServiceImpl") ProductService service,
                              SellerService sellerService) {
        this.service = service;
        this.sellerService = sellerService;
    }

    @PostMapping("")
    public ResponseEntity<?> createProduct(@RequestBody DataForNewProduct data) {
        Seller seller = sellerService.getOneById(data.getSellerId());
        Product product = Product.builder()
                .biddingPrice(data.getBiddingPrice())
                .description(data.getDescription())
                .name(data.getName())
                .seller(seller)
                .isSavedWithRelease(data.isSavedWithRelease())
                .build();
        product = service.save(product);
        return ResponseEntity.ok(product);
    }
}
