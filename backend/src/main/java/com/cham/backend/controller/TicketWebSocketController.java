package com.cham.backend.controller;

import lombok.Getter;
import lombok.Setter;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class TicketWebSocketController {

    @MessageMapping("/updateTicketCount")
    @SendTo("/topic/ticketCount")
    public TicketCountMessage updateTicketCount(TicketCountMessage message) {
        return message;
    }

    @Setter
    @Getter
    public static class TicketCountMessage {
        // Getters and setters
        private Long ticketId;
        private int count;

    }
}