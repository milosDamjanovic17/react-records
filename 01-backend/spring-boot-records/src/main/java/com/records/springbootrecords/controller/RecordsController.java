package com.records.springbootrecords.controller;

import com.records.springbootrecords.entity.Record;
import com.records.springbootrecords.service.RecordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/records")
public class RecordsController {

    private RecordService recordService;

    @Autowired
    public RecordsController(RecordService recordService){
        this.recordService = recordService;
    }

    @GetMapping("/secure/currentcheckout/count")
    public int currentCheckoutCount(){
        String userEmail = "testuser@email.com";
        return recordService.currentCheckoutCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutRecordByUser(@RequestParam Long recordId){
        String userEmail = "testuser@email.com";

        return recordService.checkoutRecordByUser(userEmail, recordId);
    }

    @PutMapping("/secure/checkout")
    public Record checkoutRecord(@RequestParam Long recordId) throws Exception{
        String userEmail = "testuser@email.com";
        return recordService.checkoutRecord(userEmail, recordId);
    }

}
