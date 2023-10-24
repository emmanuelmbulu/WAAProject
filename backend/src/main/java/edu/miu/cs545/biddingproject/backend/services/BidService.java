package edu.miu.cs545.biddingproject.backend.services;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.domains.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface BidService {
    Bid save(Bid b);
    List<Bid> getAllBidsByProduct(Product p);
    List<Bid> getAllBidsByCustomer(Customer c);
    Bid getTheLatestBidByProduct(Product p);
}
