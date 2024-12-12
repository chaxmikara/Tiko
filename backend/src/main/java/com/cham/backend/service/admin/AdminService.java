package com.cham.backend.service.admin;

import com.cham.backend.dto.TicketAddDTO;
import com.cham.backend.entity.Buyer;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface AdminService {
    boolean postTicketAdd(Long userId, TicketAddDTO ticketAddDTO) throws IOException;
    List<TicketAddDTO> getAllTicketAdds(long userId);
    void increaseTicketCount(Long ticketId);
    boolean buyTicket(Long ticketId);
    boolean deleteTicket(Long ticketId);
    boolean buyTicket(Long ticketId, Map<String, String> buyerDetails, double price);
    List<Buyer> getBuyersByTicketId(Long ticketId);
}