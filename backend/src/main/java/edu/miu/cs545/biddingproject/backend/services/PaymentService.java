package edu.miu.cs545.biddingproject.backend.services;

import edu.miu.cs545.biddingproject.backend.domains.Customer;
import edu.miu.cs545.biddingproject.backend.domains.Payment;
import edu.miu.cs545.biddingproject.backend.domains.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface PaymentService {
    Payment save(Payment p);
    List<Payment> getAllDepositPaymentsByProduct(Product p);
    Payment getDepositPaymentByCustomerAndProduct(Customer c, Product p);
    List<Payment> getAllPaymentsByProduct(Product p);
    List<Payment> getAllPaymentsByCustomer(Customer c);
}
