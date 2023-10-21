package edu.miu.cs545.biddingproject.backend.services;

import edu.miu.cs545.biddingproject.backend.domains.Product;
import org.springframework.stereotype.Service;

@Service
public interface ProductService {
    Product save(Product p);
}
