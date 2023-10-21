package edu.miu.cs545.biddingproject.backend.repositories;

import edu.miu.cs545.biddingproject.backend.domains.Seller;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SellerRepository extends JpaRepository<Seller, Long> {
}
