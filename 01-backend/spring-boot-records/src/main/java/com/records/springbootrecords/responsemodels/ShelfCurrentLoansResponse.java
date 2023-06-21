package com.records.springbootrecords.responsemodels;

import com.records.springbootrecords.entity.Record;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {

    private Record record; // entity record
    private int daysLeft;

    public ShelfCurrentLoansResponse(Record record, int daysLeft){
        this.record = record;
        this.daysLeft = daysLeft;
    }

}
