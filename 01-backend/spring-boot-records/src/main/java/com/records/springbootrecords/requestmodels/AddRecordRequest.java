package com.records.springbootrecords.requestmodels;

import lombok.Data;

@Data
public class AddRecordRequest {

    private String title;

    private String artist;

    private String description;

    private int copies;

    private String genre;

    private String img;

}
