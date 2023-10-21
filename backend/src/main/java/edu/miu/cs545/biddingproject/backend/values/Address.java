package edu.miu.cs545.biddingproject.backend.values;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Data @Embeddable @Builder
public class Address {
    private String street;
    private String city;
    private String state;
    @Column(name = "zipcode")
    private String zipCode;
}
