package edu.miu.cs545.biddingproject.backend.domains;

import edu.miu.cs545.biddingproject.backend.values.Address;
import edu.miu.cs545.biddingproject.backend.values.Name;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor @AllArgsConstructor
@Data @Builder
public class Seller {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    @Embedded
    private Name name;
    @Embedded
    private Address address;
    private String emailAddress;
    @OneToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "user_id")
    private User user;
}
