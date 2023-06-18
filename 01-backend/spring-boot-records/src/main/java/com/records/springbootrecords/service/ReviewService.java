package com.records.springbootrecords.service;

import com.records.springbootrecords.dao.RecordsRepository;
import com.records.springbootrecords.dao.ReviewRepository;
import com.records.springbootrecords.entity.Review;
import com.records.springbootrecords.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository){
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception{

        Review validateReview = reviewRepository.findByUserEmailAndRecordId(userEmail, reviewRequest.getRecordId());
        if(validateReview != null){
            throw new Exception("Review already created!");
        }

        Review review = new Review();
            review.setRecordId(reviewRequest.getRecordId());
            review.setRating(reviewRequest.getRating());
            review.setUserEmail(userEmail);
        if(reviewRequest.getReviewDescription().isPresent()){
            review.setReviewDescription(reviewRequest.getReviewDescription().map(
                    Object::toString
            ).orElse(null));
        }
            review.setDate(Date.valueOf(LocalDate.now()));

        reviewRepository.save(review);
    }

    // check if review already exists by this user
    public Boolean userReviewListed(String userEmail, Long recordId){

        Review validateReview = reviewRepository.findByUserEmailAndRecordId(userEmail, recordId);
        if(validateReview != null){
            return true;
        }else{
            return false;
        }

    }


}
