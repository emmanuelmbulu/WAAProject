package edu.miu.cs545.biddingproject.backend.queries;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @Builder @NoArgsConstructor
@AllArgsConstructor
public class ApiBodyForError {
    private int code;
    private String message;
}
