package edu.miu.cs545.biddingproject.backend.services.implementations;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import edu.miu.cs545.biddingproject.backend.repositories.BidRepository;
import edu.miu.cs545.biddingproject.backend.services.BidService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service @RequiredArgsConstructor
public class BidServiceImpl implements BidService {
    final private BidRepository repository;

    @Override
    public Bid save(Bid b) {
        return repository.save(b);
    }
}
