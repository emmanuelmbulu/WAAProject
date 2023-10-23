package edu.miu.cs545.biddingproject.backend.repositories;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface BidRepository extends JpaRepository<Bid, Long> {
    List<Bid> findAllByProductId(Long productId);

    @Query("select b from Bid b where b.product.id = ?1 order by b.id desc limit 1")
    Optional<Bid> findTheLatestBidByProduct(Long productId);
}
