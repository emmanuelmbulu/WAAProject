package edu.miu.cs545.biddingproject.backend.domains;

import edu.miu.cs545.biddingproject.backend.values.BiddingPrice;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor @NoArgsConstructor
@Data @Builder @ToString
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
    @Column(nullable = true)
    private String pictureUri;

    @ManyToOne @JoinColumn(name = "seller_id")
    private Seller seller;
}
