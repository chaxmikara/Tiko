package com.cham.backend.service.admin;

import com.cham.backend.dto.TicketAddDTO;

import java.io.IOException;

public interface AdminService {

    boolean postTicketAdd(Long userId, TicketAddDTO ticketAddDTO ) throws IOException;
}
