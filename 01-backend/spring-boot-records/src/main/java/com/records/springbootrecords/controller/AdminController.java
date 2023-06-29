package com.records.springbootrecords.controller;


import com.records.springbootrecords.requestmodels.AddRecordRequest;
import com.records.springbootrecords.service.AdminService;
import com.records.springbootrecords.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    public AdminController(AdminService adminService){
        this.adminService = adminService;
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
}
