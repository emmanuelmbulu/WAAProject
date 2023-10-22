package edu.miu.cs545.biddingproject.backend.repositories;

import edu.miu.cs545.biddingproject.backend.domains.Payment;
import edu.miu.cs545.biddingproject.backend.domains.PaymentType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<Payment> findAllByProductIdAndPaymentType(Long productId, PaymentType type);
    Optional<Payment> findByProductIdAndCustomerIdAndPaymentType(Long productId, Long customerId, PaymentType type);
    List<Payment> findAllByProductId(Long productId);
    List<Payment> findAllByCustomerId(Long customerId);
}
