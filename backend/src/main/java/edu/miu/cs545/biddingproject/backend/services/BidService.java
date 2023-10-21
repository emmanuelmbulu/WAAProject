package edu.miu.cs545.biddingproject.backend.services;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import org.springframework.stereotype.Service;

@Service
public interface BidService {
    Bid save(Bid b);
}
