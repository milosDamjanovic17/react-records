package com.records.springbootrecords.service;

import com.records.springbootrecords.dao.CheckoutRepository;
import com.records.springbootrecords.dao.RecordsRepository;
import com.records.springbootrecords.dao.ReviewRepository;
import com.records.springbootrecords.entity.Record;
import com.records.springbootrecords.requestmodels.AddRecordRequest;
import org.hibernate.annotations.Check;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {

    private final RecordsRepository recordsRepository;
    private final ReviewRepository reviewRepository;
    private final CheckoutRepository checkoutRepository;

    @Autowired
    public AdminService(RecordsRepository recordsRepository, ReviewRepository reviewRepository, CheckoutRepository checkoutRepository){
        this.recordsRepository = recordsRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public void decreaseRecordQuantity (Long recordId) throws Exception{

        Optional<Record> record = recordsRepository.findById(recordId);

        if(record.isEmpty() || record.get().getCopiesAvailable() <= 0 || record.get().getCopies() <= 0){
            throw new Exception("Record not fount or quantity locked");
        }

        record.get().setCopiesAvailable(record.get().getCopiesAvailable() - 1);
        record.get().setCopies(record.get().getCopies() - 1);

        recordsRepository.save(record.get());
    }

    public void increaseRecordQuantity (Long recordId) throws Exception{

        Optional<Record> record = recordsRepository.findById(recordId);

        if(!record.isPresent()){
            throw new Exception("Record wasn't found!");
        }

        record.get().setCopiesAvailable(record.get().getCopiesAvailable() + 1);
        record.get().setCopies(record.get().getCopies() + 1);

        recordsRepository.save(record.get());
    }


    public void postRecord(AddRecordRequest addRecordRequest){

        Record record = new Record();
            record.setTitle(addRecordRequest.getTitle());
            record.setArtist(addRecordRequest.getArtist());
            record.setDescription(addRecordRequest.getDescription());
            record.setCopies(addRecordRequest.getCopies());
            record.setCopiesAvailable(addRecordRequest.getCopies());
            record.setGenre(addRecordRequest.getGenre());
            record.setImg(addRecordRequest.getImg());

        recordsRepository.save(record);


    }

    public void deleteRecord(Long recordId) throws Exception {

        Optional<Record> record = recordsRepository.findById(recordId);

        if(!record.isPresent()){
            throw new Exception("Record not found!");
        }

        recordsRepository.delete(record.get());
        checkoutRepository.deleteAllByRecordId(recordId);
        reviewRepository.deleteAllByRecordId(recordId);
    }

}
