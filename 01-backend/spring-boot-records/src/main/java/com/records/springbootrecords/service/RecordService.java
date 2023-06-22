package com.records.springbootrecords.service;


import com.records.springbootrecords.dao.CheckoutRepository;
import com.records.springbootrecords.dao.RecordsRepository;
import com.records.springbootrecords.entity.Checkout;
import com.records.springbootrecords.entity.Record;
import com.records.springbootrecords.responsemodels.ShelfCurrentLoansResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

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

    public List<ShelfCurrentLoansResponse> currentLoans (String userEmail) throws Exception{

        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponse = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findRecordsByUserEmail(userEmail); // => gather all records that user already checkedout, it will return only recordId's

        List<Long> recordIdList = new ArrayList<>();

        for(Checkout c: checkoutList) {
            recordIdList.add(c.getRecordId());
        }

        List<Record> records = recordsRepository.findRecordsByRecordId(recordIdList);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for(Record record: records){
            Optional<Checkout> checkout = checkoutList.stream()
                    .filter(x -> x.getRecordId() == record.getId()).findFirst(); // find first record that matches the record id that we checked out

            if(checkout.isPresent()){
                Date d1 = sdf.parse(checkout.get().getCheckoutDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long difference_in_time = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponse.add(new ShelfCurrentLoansResponse(record, (int) difference_in_time));
            }
        }

        return shelfCurrentLoansResponse;
    }

    public void returnRecord(String userEmail, Long recordId) throws Exception{

        Optional<Record> record = recordsRepository.findById(recordId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndRecordId(userEmail, recordId);

        if(!record.isPresent() || validateCheckout == null){
            throw new Exception("Record doesn't exist or its not checked out by the user");
        }

        record.get().setCopiesAvailable(record.get().getCopiesAvailable() + 1);

        recordsRepository.save(record.get());
        checkoutRepository.deleteById(validateCheckout.getId());
    }
}








































