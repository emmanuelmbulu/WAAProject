package edu.miu.cs545.biddingproject.backend.domains;

import edu.miu.cs545.biddingproject.backend.values.BiddingPrice;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data @Builder
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(columnDefinition = "text", nullable = true)
    private String description;
    @Embedded
    private BiddingPrice biddingPrice;
    private boolean savedWithRelease = false;
    private double depositAmount;

    @ManyToOne @JoinColumn(name = "seller_id")
    private Seller seller;
}
