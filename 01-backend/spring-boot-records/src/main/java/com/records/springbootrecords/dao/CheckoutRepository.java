package com.records.springbootrecords.dao;

import com.records.springbootrecords.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout,Long> {

    Checkout findByUserEmailAndRecordId(String userEmail, Long recordId);

    List<Checkout> findRecordsByUserEmail(String userEmail);
}
