package com.records.springbootrecords.service;

import com.records.springbootrecords.dao.MessagesRepository;
import com.records.springbootrecords.entity.Messages;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class MessagesService {

    private final MessagesRepository messagesRepository;

    @Autowired
    public MessagesService(MessagesRepository messagesRepository){
        this.messagesRepository = messagesRepository;
    }

    public void postMessage(Messages messageRequest, String userEmail){

        Messages messages = new Messages(messageRequest.getTitle(), messageRequest.getQuestion());
        messages.setUserEmail(userEmail);
        messagesRepository.save(messages);
    }

}
