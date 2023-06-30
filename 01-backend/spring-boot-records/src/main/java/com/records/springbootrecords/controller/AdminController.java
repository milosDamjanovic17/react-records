package com.records.springbootrecords.controller;


import com.records.springbootrecords.requestmodels.AddRecordRequest;
import com.records.springbootrecords.service.AdminService;
import com.records.springbootrecords.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mediatype.alps.Ext;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService){
        this.adminService = adminService;
    }

    @PutMapping("/secure/decrease/record/quantity")
    public void decreaseRecordQuantity(@RequestHeader(value = "Authorization") String token,
                                       @RequestParam Long recordId) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only!");
        }

        adminService.decreaseRecordQuantity(recordId);
    }
    @PutMapping("/secure/increase/record/quantity")
    public void increaseRecordQuantity(@RequestHeader(value = "Authorization") String token,
                                       @RequestParam Long recordId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only!");
        }

        adminService.increaseRecordQuantity(recordId);
    }

    @PostMapping("/secure/add/record")
    public void postRecord(@RequestHeader(value = "Authorization") String token,
                           @RequestBody AddRecordRequest addRecordRequest) throws Exception{

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only!");
        }

        adminService.postRecord(addRecordRequest);
    }

    @DeleteMapping("/secure/delete/record")
    public void deleteRecord(@RequestHeader(value = "Authorization") String token,
                             @RequestParam Long recordId) throws Exception {

        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");

        if(admin == null || !admin.equals("admin")){
            throw new Exception("Administration page only!");
        }

        adminService.deleteRecord(recordId);
    }

}
