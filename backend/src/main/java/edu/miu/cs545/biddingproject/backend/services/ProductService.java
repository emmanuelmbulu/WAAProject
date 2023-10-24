package edu.miu.cs545.biddingproject.backend.services;

import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.domains.Seller;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {
    Product save(Product p);
    Product getOneById(Long id);
    List<Product> getAllProducts();
    List<Product> getAllProductsAvailableForBidding();
    List<Product> getAllProductsBySeller(Seller s);
    Product update(Long id, Product p);
}
