package edu.miu.cs545.biddingproject.backend.controllers;

import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.queries.DataForNewSeller;
import edu.miu.cs545.biddingproject.backend.services.SellerService;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("sellers")
public class SellerController {
    final private SellerService service;

    public SellerController(@Qualifier("sellerServiceImpl") SellerService service) {
        this.service = service;
    }

    @PostMapping("")
    public ResponseEntity<?> registerSeller(@RequestBody DataForNewSeller data) {
        Seller seller = Seller.builder()
                .address(data.getAddress())
                .name(data.getName())
                .emailAddress(data.getEmailAddress())
                .build();
        seller = service.save(seller);
        return ResponseEntity.ok(seller);
    }
}
