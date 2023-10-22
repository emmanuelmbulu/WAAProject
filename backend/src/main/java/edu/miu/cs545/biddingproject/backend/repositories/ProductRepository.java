package edu.miu.cs545.biddingproject.backend.repositories;

import edu.miu.cs545.biddingproject.backend.domains.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllBySavedWithRelease(boolean savedWithRelease);
    @Query("select p from Product p where p.savedWithRelease = true and p.biddingPrice.endingTime > CURRENT_TIMESTAMP ")
    List<Product> findAllAvailableForBidding();
}
