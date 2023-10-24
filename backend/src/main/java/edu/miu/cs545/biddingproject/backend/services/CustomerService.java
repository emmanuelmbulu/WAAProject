package edu.miu.cs545.biddingproject.backend.services;

import edu.miu.cs545.biddingproject.backend.domains.Customer;
import org.springframework.stereotype.Service;

@Service
public interface CustomerService {
    Customer save(Customer c);
    Customer getOneById(Long id);
    Customer getOneByEmailAddress(String email);
}
