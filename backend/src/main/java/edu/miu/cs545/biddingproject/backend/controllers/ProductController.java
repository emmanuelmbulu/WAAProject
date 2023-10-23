package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewProduct;
import edu.miu.cs545.biddingproject.backend.services.BidService;
import edu.miu.cs545.biddingproject.backend.services.FileUploadService;
import edu.miu.cs545.biddingproject.backend.services.ProductService;
import edu.miu.cs545.biddingproject.backend.services.SellerService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
        Product product = Product.builder()
                .biddingPrice(data.getBiddingPrice())
                .description(data.getDescription())
                .name(data.getName())
                .depositAmount(data.getDepositAmount())
                .seller(seller)
                .savedWithRelease(data.isSavedWithRelease())
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

    @PostMapping("/{id}")
    public ResponseEntity<?> uploadProductPicture(
            @PathVariable Long id,
            @RequestParam("files") MultipartFile[] files) {
        Product product = service.getOneById(id);
        if(product == null) return ResponseEntity.notFound().build();

        try {
            String fileName = fileUploadService.saveFile(files[0]);
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
