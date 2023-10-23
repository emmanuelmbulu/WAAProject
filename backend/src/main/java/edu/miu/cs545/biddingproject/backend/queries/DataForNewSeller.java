package edu.miu.cs545.biddingproject.backend.queries;

import edu.miu.cs545.biddingproject.backend.values.Address;
import edu.miu.cs545.biddingproject.backend.values.Name;
import lombok.Data;

@Data
public class DataForNewSeller {
    private String emailAddress;
    private Name name;
    private Address address;
    private String password;
}
