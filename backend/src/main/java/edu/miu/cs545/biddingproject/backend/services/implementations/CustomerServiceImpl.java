package edu.miu.cs545.biddingproject.backend.services.implementations;

import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.repositories.CustomerRepository;
import edu.miu.cs545.biddingproject.backend.services.CustomerService;
import org.springframework.stereotype.Service;

@Service
public class CustomerServiceImpl implements CustomerService {
    final private CustomerRepository repository;

    public CustomerServiceImpl( CustomerRepository repository) {
        this.repository = repository;
    }
    @Override
    public Customer save(Customer c) {
        return repository.save(c);
    }
}
