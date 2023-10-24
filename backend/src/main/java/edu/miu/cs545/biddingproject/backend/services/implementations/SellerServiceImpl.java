package edu.miu.cs545.biddingproject.backend.services.implementations;

import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.repositories.SellerRepository;
import edu.miu.cs545.biddingproject.backend.services.SellerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class SellerServiceImpl implements SellerService {
    final private SellerRepository repository;

    @Override
    public Seller save(Seller s) {
        return repository.save(s);
    }

    @Override
    public Seller getOneById(Long id) {
        return repository.findById(id).orElse(null);
    }

    @Override
    public Seller getOneByEmailAddress(String email) {
        return repository.findByEmailAddressIgnoreCase(email).orElse(null);
    }
}
