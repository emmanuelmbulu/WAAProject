package edu.miu.cs545.biddingproject.backend.values;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Embeddable
@AllArgsConstructor @NoArgsConstructor
@Data @Builder
public class BiddingPrice {
    private double price;
    private LocalDateTime endingTime;
    private LocalDateTime paymentDueDate;
}
