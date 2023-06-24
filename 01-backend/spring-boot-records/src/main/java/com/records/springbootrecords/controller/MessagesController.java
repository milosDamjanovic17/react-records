package com.records.springbootrecords.controller;

import com.records.springbootrecords.entity.Messages;
import com.records.springbootrecords.service.MessagesService;
import com.records.springbootrecords.utils.ExtractJWT;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessagesController {


    private final MessagesService messagesService;

    public MessagesController(MessagesService messagesService){
        this.messagesService = messagesService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value = "Authorization") String token,
                            @RequestBody Messages messageRequest){

        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        messagesService.postMessage(messageRequest, userEmail);
    }


}
