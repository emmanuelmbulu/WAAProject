package edu.miu.cs545.biddingproject.backend.domains;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor @AllArgsConstructor
@Data @Builder
public class Bid {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private double price;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;
}
