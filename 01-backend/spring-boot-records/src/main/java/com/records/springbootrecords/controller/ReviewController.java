package com.records.springbootrecords.controller;

import com.records.springbootrecords.requestmodels.ReviewRequest;
import com.records.springbootrecords.service.ReviewService;
import com.records.springbootrecords.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.mediatype.alps.Ext;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService){
        this.reviewService = reviewService;
    }

    @GetMapping("/secure/user/record")
    public Boolean reviewRecordByUser(@RequestHeader(value = "Authorization") String token, @RequestParam Long recordId) throws  Exception{

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        if(userEmail == null){
            throw new Exception("User email missing!");
        }

        return reviewService.userReviewListed(userEmail, recordId);
    }

    @PostMapping("/secure")
    public void postReview(@RequestHeader(value="Authorization") String token, @RequestBody ReviewRequest reviewRequest) throws Exception{

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");

        if(userEmail == null){
            throw new Exception("User email is missing");
        }
        reviewService.postReview(userEmail, reviewRequest);
    }

}
