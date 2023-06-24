package com.records.springbootrecords.dao;

import com.records.springbootrecords.entity.Messages;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessagesRepository extends JpaRepository<Messages, Long> {
}
