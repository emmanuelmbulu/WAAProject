package edu.miu.cs545.biddingproject.backend.repositories;

import edu.miu.cs545.biddingproject.backend.domains.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
