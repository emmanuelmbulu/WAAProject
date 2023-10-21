package edu.miu.cs545.biddingproject.backend.repositories;

import edu.miu.cs545.biddingproject.backend.domains.Bid;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BidRepository extends JpaRepository<Bid, Long> {
}
