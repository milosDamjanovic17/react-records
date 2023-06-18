package com.records.springbootrecords.requestmodels;

import lombok.Data;

import java.util.Optional;

@Data
public class ReviewRequest {

    private double rating;
    private Long recordId;
    private Optional<String> reviewDescription;


}
