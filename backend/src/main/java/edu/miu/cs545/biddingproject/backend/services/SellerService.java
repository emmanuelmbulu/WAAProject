package edu.miu.cs545.biddingproject.backend.services;

import edu.miu.cs545.biddingproject.backend.domains.Seller;
import edu.miu.cs545.biddingproject.backend.domains.User;
import org.springframework.stereotype.Service;

@Service
public interface SellerService {
    Seller save(Seller s);
    Seller getOneById(Long id);
    Seller getOneByEmailAddress(String email);
    Seller getSellerRelatedToUser(User user);
}
