package com.cham.backend.controller;

import com.cham.backend.dto.TicketAddDTO;
import com.cham.backend.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/postTicketAdd/{userId}")
    public ResponseEntity<?>postTicketAdd(@PathVariable Long userId, @ModelAttribute TicketAddDTO ticketAddDTO) throws IOException {
        boolean success= adminService.postTicketAdd(userId, ticketAddDTO);
        if (success){
            return ResponseEntity.ok("Ticket added successfully");
        }
        else {
            return ResponseEntity.badRequest().body("Ticket not added please try again");
        }
    }
}
