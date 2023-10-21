package edu.miu.cs545.biddingproject.backend.services;

import edu.miu.cs545.biddingproject.backend.domains.Seller;
import org.springframework.stereotype.Service;

@Service
public interface SellerService {
    Seller save(Seller s);
}
