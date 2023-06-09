package com.records.springbootrecords.dao;

import com.records.springbootrecords.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByRecordId(@RequestParam("record_id") Long recordId, Pageable pageable);

    Review findByUserEmailAndRecordId(String userEmail, Long recordId);

    @Modifying
    @Query("delete from Review where record_id in :record_id")
    void deleteAllByRecordId(@Param("record_id") Long recordId);
}
