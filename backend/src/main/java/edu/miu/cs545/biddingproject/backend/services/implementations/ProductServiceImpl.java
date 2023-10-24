package edu.miu.cs545.biddingproject.backend.services.implementations;

import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.repositories.ProductRepository;
import edu.miu.cs545.biddingproject.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {
    final private ProductRepository repository;
    @Override
    public Product save(Product p) {
        return repository.save(p);
    }

    @Override
    public Product getOneById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public List<Product> getAllProducts() {
        return repository.findAll();
    }

    @Override
    public List<Product> getAllProductsAvailableForBidding() {
        return repository.findAllAvailableForBidding();
    }

    @Override
    public List<Product> getAllProductsBySeller(Seller s) {
        return repository.findAllBySellerId(s.getId());
    }

    @Override
    public Product update(Long id, Product p) {
        Product product = getOneById(id);
        if(product == null) return null;

        if(p.getName() != null) product.setName(p.getName());
        if(p.getBiddingPrice() != null) product.setBiddingPrice(p.getBiddingPrice());
        if(p.getDepositAmount() != 0) product.setDepositAmount(p.getDepositAmount());
        if(p.getDescription() != null) product.setDescription(p.getDescription());
        return save(product);
    }
}
