package com.cham.backend.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Lob;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class TicketAddDTO {
    private Long id;

    private String title;

    private String description;

    private double price;

    private MultipartFile img;

    private byte[] returnedImg;

    private Long userId;
}

