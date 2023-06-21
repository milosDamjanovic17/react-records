package com.records.springbootrecords.dao;


import com.records.springbootrecords.entity.Record;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface RecordsRepository extends JpaRepository<Record, Long> {

    Page<Record> findByTitleContaining(@RequestParam("title") String title, Pageable pageable);

    Page<Record> findByGenre(@RequestParam("genre") String genre, Pageable pageable);

    @Query("select o from Record o where id in :record_ids")
    List<Record> findRecordsByRecordId(@Param("record_ids") List<Long> recordId);
}
