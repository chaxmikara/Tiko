package com.cham.backend.controller;

import com.cham.backend.dto.TicketAddDTO;
import com.cham.backend.entity.Buyer;
import com.cham.backend.service.admin.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/ticket/{userId}")
    public ResponseEntity<?> getAllTicketsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(adminService.getAllTicketAdds(userId));
    }

    @DeleteMapping("/ticket/{ticketId}")
    public ResponseEntity<?> deleteTicket(@PathVariable Long ticketId) {
        boolean success = adminService.deleteTicket(ticketId);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
    @PostMapping("/buyTicket")
    public ResponseEntity<?> buyTicket(@RequestBody Map<String, Object> payload) {
        Long ticketId = Long.valueOf(payload.get("ticketId").toString());
        Map<String, String> buyerDetails = (Map<String, String>) payload.get("buyerDetails");
        double price = Double.valueOf(payload.get("price").toString());

        boolean success = adminService.buyTicket(ticketId, buyerDetails, price);
        if (success) {
            return ResponseEntity.status(HttpStatus.OK).build();
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
    @GetMapping("/buyers/{ticketId}")
    public ResponseEntity<?> getBuyersByTicketId(@PathVariable Long ticketId) {
        List<Buyer> buyers = adminService.getBuyersByTicketId(ticketId);
        return ResponseEntity.ok(buyers);
    }
}