package edu.miu.cs545.biddingproject.backend.services.implementations;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.repositories.BidRepository;
import edu.miu.cs545.biddingproject.backend.services.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class BidServiceImpl implements BidService {
    final private BidRepository repository;

    @Override
    public Bid save(Bid b) {
        return repository.save(b);
    }

    @Override
    public List<Bid> getAllBidsByProduct(Product p) {
        return repository.findAllByProductIdOrderByIdDesc(p.getId());
    }

    @Override
    public List<Bid> getAllBidsByCustomer(Customer c) {
        return repository.findAllByCustomerIdOrderByIdDesc(c.getId());
    }

    @Override
    public Bid getTheLatestBidByProduct(Product p) {
        return repository.findTheLatestBidByProduct(p.getId()).orElse(null);
    }
}
