package com.cham.backend.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
public class TicketAddDTO {
    private Long id;

    private String title;

    private String description;

    private double price;

    private MultipartFile img;

    private byte[] returnedImg;

    private Long userId;

    private int numberOfTickets;

    private int releaseRate;

    private String date;
}

