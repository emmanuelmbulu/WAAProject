package edu.miu.cs545.biddingproject.backend.values;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor @AllArgsConstructor
@Data @Embeddable
public class Name {
    @Column(name = "firstname")
    private String firstName;
    @Column(name = "lastname")
    private String lastName;
}
