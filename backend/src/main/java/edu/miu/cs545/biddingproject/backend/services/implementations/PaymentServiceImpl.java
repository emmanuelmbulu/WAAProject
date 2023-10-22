package edu.miu.cs545.biddingproject.backend.services.implementations;

import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.domains.Payment;
import edu.miu.cs545.biddingproject.backend.domains.PaymentType;
import edu.miu.cs545.biddingproject.backend.domains.Product;
import edu.miu.cs545.biddingproject.backend.repositories.PaymentRepository;
import edu.miu.cs545.biddingproject.backend.services.PaymentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service @RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
    final private PaymentRepository repository;
    @Override
    public Payment save(Payment p) {
        return repository.save(p);
    }

    @Override
    public List<Payment> getAllDepositPaymentsByProduct(Product p) {
        return repository.findAllByProductIdAndPaymentType(p.getId(), PaymentType.DEPOSIT);
    }

    @Override
    public Payment getDepositPaymentByCustomerAndProduct(Customer c, Product p) {
        return repository.findByProductIdAndCustomerIdAndPaymentType(p.getId(), c.getId(), PaymentType.DEPOSIT)
                .orElse(null);
    }

    @Override
    public List<Payment> getAllPaymentsByProduct(Product p) {
        return repository.findAllByProductId(p.getId());
    }

    @Override
    public List<Payment> getAllPaymentsByCustomer(Customer c) {
        return repository.findAllByCustomerId(c.getId());
    }
}
