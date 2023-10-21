package edu.miu.cs545.biddingproject.backend.domains;

import jakarta.persistence.Embeddable;
import lombok.Data;

@Embeddable
@Data
public class Name {
    private String firstName;
    private String lastName;
    public String getFullName(){
        return firstName + " " + lastName;
    }

}
