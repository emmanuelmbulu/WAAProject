package edu.miu.cs545.biddingproject.backend.queries;

import edu.miu.cs545.biddingproject.backend.values.Name;
import lombok.Data;

@Data
public class DataForNewCustomer {
    private String emailAddress;
    private String licenseNumber;
    private Name name;
    private String password;
}
