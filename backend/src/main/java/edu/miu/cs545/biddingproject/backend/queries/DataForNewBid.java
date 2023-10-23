package edu.miu.cs545.biddingproject.backend.queries;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @AllArgsConstructor
@NoArgsConstructor @Builder
public class DataForNewBid {
    private Long productId;
    private Long customerId;
    private double price;
}
