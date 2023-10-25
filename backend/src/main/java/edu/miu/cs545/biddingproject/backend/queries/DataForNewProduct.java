package edu.miu.cs545.biddingproject.backend.queries;

import edu.miu.cs545.biddingproject.backend.values.BiddingPrice;
import lombok.*;

@NoArgsConstructor @AllArgsConstructor
@Builder @Data @ToString
public class DataForNewProduct {
    private Long sellerId;
    private String name;
    private String description;
    private BiddingPrice biddingPrice;
    private boolean savedWithRelease;
    private double depositAmount;
}
