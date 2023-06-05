package com.records.springbootrecords.controller;

import com.records.springbootrecords.entity.Record;
import com.records.springbootrecords.service.RecordService;
import com.records.springbootrecords.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/records")
public class RecordsController {

    private final RecordService recordService;

    @Autowired
    public RecordsController(RecordService recordService){
        this.recordService = recordService;
    }

    @GetMapping("/secure/currentcheckout/count")
    public int currentCheckoutCount(@RequestHeader(value = "Authorization") String token){

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return recordService.currentCheckoutCount(userEmail);
    }

    @GetMapping("/secure/ischeckedout/byuser")
    public Boolean checkoutRecordByUser(@RequestHeader(value = "Authorization") String token,
                                        @RequestParam Long recordId){

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return recordService.checkoutRecordByUser(userEmail, recordId);
    }

    @PutMapping("/secure/checkout")
    public Record checkoutRecord( @RequestHeader(value = "Authorization") String token,
                                  @RequestParam Long recordId) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return recordService.checkoutRecord(userEmail, recordId);
    }

}
