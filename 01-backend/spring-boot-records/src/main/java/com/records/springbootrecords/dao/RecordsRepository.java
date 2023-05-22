package com.records.springbootrecords.dao;


import com.records.springbootrecords.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordsRepository extends JpaRepository<Record, Long> {
}
