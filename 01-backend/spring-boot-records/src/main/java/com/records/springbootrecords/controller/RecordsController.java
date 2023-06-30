package com.records.springbootrecords.controller;

import com.records.springbootrecords.entity.Record;
import com.records.springbootrecords.responsemodels.ShelfCurrentLoansResponse;
import com.records.springbootrecords.service.RecordService;
import com.records.springbootrecords.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mediatype.alps.Ext;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("https://localhost:3000")
@RestController
@RequestMapping("/api/records")
public class RecordsController {

    private final RecordService recordService;

    @Autowired
    public RecordsController(RecordService recordService){
        this.recordService = recordService;
    }

    @GetMapping("/secure/currentloans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        return recordService.currentLoans(userEmail);
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

    @PutMapping("/secure/return")
    public void returnRecord(@RequestHeader(value = "Authorization") String token,
                             @RequestParam Long recordId) throws Exception{

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        recordService.returnRecord(userEmail, recordId);
    }

    @PutMapping("/secure/renew/loan")
    public void renewLoan(@RequestHeader(value = "Authorization") String token,
                          @RequestParam Long recordId) throws Exception{

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        recordService.renewLoan(userEmail,recordId);

    }
}
