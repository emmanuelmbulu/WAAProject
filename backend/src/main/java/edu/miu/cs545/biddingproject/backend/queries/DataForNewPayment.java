package edu.miu.cs545.biddingproject.backend.queries;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor @NoArgsConstructor
@Builder @Data
public class DataForNewPayment {
    private Long customerId;
    private Long productId;
    private double amount;
}
