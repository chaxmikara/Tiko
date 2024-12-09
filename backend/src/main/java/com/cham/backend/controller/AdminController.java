package com.cham.backend.controller;

import com.cham.backend.dto.TicketAddDTO;
import com.cham.backend.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/postTicketAdd/{userId}")
    public ResponseEntity<?> postTicketAdd(@PathVariable("userId") Long userId, @ModelAttribute TicketAddDTO ticketAddDTO) throws IOException {
        boolean success = adminService.postTicketAdd(userId, ticketAddDTO);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}