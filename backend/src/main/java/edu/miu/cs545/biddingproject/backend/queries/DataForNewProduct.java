package edu.miu.cs545.biddingproject.backend.queries;

import edu.miu.cs545.biddingproject.backend.values.BiddingPrice;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Builder @Data
public class DataForNewProduct {
    private Long sellerId;
    private String name;
    private String description;
    private BiddingPrice biddingPrice;
    private boolean isSavedWithRelease;
}
