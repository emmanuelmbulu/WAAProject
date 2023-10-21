package edu.miu.cs545.biddingproject.backend.services.implementations;

import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.repositories.SellerRepository;
import edu.miu.cs545.biddingproject.backend.services.SellerService;
import org.springframework.stereotype.Service;

@Service
public class SellerServiceImpl implements SellerService {
    final private SellerRepository repository;

    public SellerServiceImpl(SellerRepository repository) {
        this.repository = repository;
    }

    @Override
    public Seller save(Seller s) {
        return repository.save(s);
    }
}
