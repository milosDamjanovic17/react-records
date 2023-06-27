package com.records.springbootrecords.dao;

import com.records.springbootrecords.entity.Messages;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface MessagesRepository extends JpaRepository<Messages, Long> {

    Page<Messages> findByUserEmail(@RequestParam("user_email") String userEmail, Pageable pageable);

    Page<Messages> findByClosed(@RequestParam("closed") boolean closed, Pageable pageable);

}
