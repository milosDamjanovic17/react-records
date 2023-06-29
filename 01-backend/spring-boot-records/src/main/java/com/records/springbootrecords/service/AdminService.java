package com.records.springbootrecords.service;

import com.records.springbootrecords.dao.RecordsRepository;
import com.records.springbootrecords.entity.Record;
import com.records.springbootrecords.requestmodels.AddRecordRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdminService {

    private final RecordsRepository recordsRepository;

    @Autowired
    public AdminService(RecordsRepository recordsRepository){
        this.recordsRepository = recordsRepository;
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

}
