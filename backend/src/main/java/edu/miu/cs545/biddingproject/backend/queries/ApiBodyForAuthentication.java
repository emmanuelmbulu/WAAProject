package edu.miu.cs545.biddingproject.backend.queries;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder @NoArgsConstructor
@AllArgsConstructor
public class ApiBodyForAuthentication {
    private Long userId;
    private String token;
    private LocalDateTime tokenExpirationDate;
}
