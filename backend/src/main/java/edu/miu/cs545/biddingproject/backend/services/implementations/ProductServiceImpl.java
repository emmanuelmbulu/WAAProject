package edu.miu.cs545.biddingproject.backend.services.implementations;

import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.repositories.ProductRepository;
import edu.miu.cs545.biddingproject.backend.services.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}
