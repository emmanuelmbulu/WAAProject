package edu.miu.cs545.biddingproject.backend.domains;

import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Customer {
    @Id
    private int id;
    @Embedded
    private Name name;
    private String email;
    @Embedded
    private Address address;

}
