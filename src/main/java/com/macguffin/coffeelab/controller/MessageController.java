package com.macguffin.coffeelab.controller;

import com.macguffin.coffeelab.entity.Message;
import com.macguffin.coffeelab.service.MessageService;
import com.macguffin.coffeelab.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/messages")
public class MessageController {

    private MessageService messageService;

    @Autowired
    public MessageController (MessageService messageService) {
        this.messageService = messageService;
    }

    @PostMapping("/secure/add/message")
    public void postMessage(@RequestHeader(value="Authorization") String token,
                            @RequestBody Message messageRequest) {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        System.out.println("messageRequest = ");
        messageService.postMessage(messageRequest, userEmail);
    }
}
