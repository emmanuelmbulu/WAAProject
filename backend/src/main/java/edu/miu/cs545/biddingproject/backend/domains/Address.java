package edu.miu.cs545.biddingproject.backend.domains;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Address {
    private String street;
    public String city;
    private String state;
    private String zipCode;
}
