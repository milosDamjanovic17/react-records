package com.records.springbootrecords.service;


import com.records.springbootrecords.dao.CheckoutRepository;
import com.records.springbootrecords.dao.HistoryRepository;
import com.records.springbootrecords.dao.PaymentRepository;
import com.records.springbootrecords.dao.RecordsRepository;
import com.records.springbootrecords.entity.Checkout;
import com.records.springbootrecords.entity.History;
import com.records.springbootrecords.entity.Payment;
import com.records.springbootrecords.entity.Record;
import com.records.springbootrecords.responsemodels.ShelfCurrentLoansResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Time;
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
    private HistoryRepository historyRepository;
    private PaymentRepository paymentRepository;

    @Autowired
    public RecordService(RecordsRepository recordsRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository, PaymentRepository paymentRepository){
        this.recordsRepository = recordsRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
        this.paymentRepository = paymentRepository;
    }


    public Record checkoutRecord(String userEmail, Long recordId) throws Exception {

        Optional<Record> record = recordsRepository.findById(recordId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndRecordId(userEmail, recordId);

        if(!record.isPresent() || validateCheckout != null || record.get().getCopiesAvailable() <= 0){
            throw new Exception("Record doesn't exist or is already checked out by user!");
        }

        List<Checkout> currentRecordsCheckout = checkoutRepository.findRecordsByUserEmail(userEmail);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        boolean recordNeedsReturned = false;

        for(Checkout c: currentRecordsCheckout){
            Date d1 = sdf.parse(c.getReturnDate());
            Date d2 = sdf.parse(LocalDate.now().toString());

            TimeUnit time = TimeUnit.DAYS;

            double differenceInTime = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

            if(differenceInTime < 0){
                recordNeedsReturned = true;
                break;
            }
        }

        Payment userPayment = paymentRepository.findByUserEmail(userEmail);

        if((userPayment != null && userPayment.getAmount() > 0) || (userPayment != null && recordNeedsReturned)){
            throw new Exception("Outstanding fees...");
        }

        if(userPayment == null){

            Payment payment = new Payment();
            payment.setAmount(00.00);
            payment.setUserEmail(userEmail);

            paymentRepository.save(payment);
        }

        record.get().setCopiesAvailable(record.get().getCopiesAvailable() - 1);
        recordsRepository.save(record.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
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

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = sdf.parse(validateCheckout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());

        TimeUnit time = TimeUnit.DAYS;

        double differenceInTime = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

        if(differenceInTime < 0){
            Payment payment = paymentRepository.findByUserEmail(userEmail);

            payment.setAmount(payment.getAmount() + (differenceInTime * -1));
            paymentRepository.save(payment);
        }

        checkoutRepository.deleteById(validateCheckout.getId());

        // save history object to DB
        History history = new History(
                userEmail,
                validateCheckout.getCheckoutDate(),
                LocalDate.now().toString(),
                record.get().getTitle(),
                record.get().getArtist(),
                record.get().getDescription(),
                record.get().getImg()
        );

        historyRepository.save(history);
    }

    public void renewLoan(String userEmail, Long recordId) throws Exception{

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndRecordId(userEmail, recordId);

        if(validateCheckout == null){
            throw new Exception("Book does not exist or is not checked out by user");
        }

        SimpleDateFormat sdFormat = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = sdFormat.parse(validateCheckout.getCheckoutDate());
        Date d2 = sdFormat.parse(LocalDate.now().toString());

        if(d1.compareTo(d2) > 0 || d1.compareTo(d2) == 0){
            validateCheckout.setCheckoutDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);
        }

    }
}








































