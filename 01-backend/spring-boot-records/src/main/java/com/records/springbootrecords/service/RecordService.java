package com.records.springbootrecords.service;


import com.records.springbootrecords.dao.CheckoutRepository;
import com.records.springbootrecords.dao.RecordsRepository;
import com.records.springbootrecords.entity.Checkout;
import com.records.springbootrecords.entity.Record;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class RecordService {

    // inject repositories
    private RecordsRepository recordsRepository;
    private CheckoutRepository checkoutRepository;

    public RecordService(RecordsRepository recordsRepository, CheckoutRepository checkoutRepository){
        this.recordsRepository = recordsRepository;
        this.checkoutRepository = checkoutRepository;
    }


    public Record checkoutRecord(String userEmail, Long recordId) throws Exception {

        Optional<Record> record = recordsRepository.findById(recordId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndRecordId(userEmail, recordId);

        if(!record.isPresent() || validateCheckout != null || record.get().getCopiesAvailable() <= 0){
            throw new Exception("Record doesn't exist or is already checked out by user!");
        }

        record.get().setCopiesAvailable(record.get().getCopiesAvailable() - 1);
        recordsRepository.save(record.get());


        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                record.get().getId()
        );

        checkoutRepository.save(checkout);
        return record.get();
    }

    public Boolean checkoutRecordByUser(String userEmail, Long recordId){

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndRecordId(userEmail, recordId);

        if(validateCheckout != null){
            return true;
        }else{
            return  false;
        }
    }

    public int currentCheckoutCount(String userEmail){

        return checkoutRepository.findRecordsByUserEmail(userEmail).size();
    }
}








































