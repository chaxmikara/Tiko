package com.cham.backend.service.admin;

import com.cham.backend.dto.TicketAddDTO;
import com.cham.backend.entity.Buyer;
import com.cham.backend.entity.TicketAdd;
import com.cham.backend.entity.User;
import com.cham.backend.repository.BuyerRepository;
import com.cham.backend.repository.TicketAddRepository;
import com.cham.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketAddRepository ticketAddRepository;

    @Autowired
    private BuyerRepository buyerRepository;

    public boolean postTicketAdd(Long userId, TicketAddDTO ticketAddDTO) throws IOException {
        Optional<User> optionalUser = userRepository.findById(userId);
        if (optionalUser.isPresent()) {
            TicketAdd ticketAdd = new TicketAdd();
            ticketAdd.setTitle(ticketAddDTO.getTitle());
            ticketAdd.setDescription(ticketAddDTO.getDescription());
            ticketAdd.setImg(ticketAddDTO.getImg().getBytes());
            ticketAdd.setPrice(ticketAddDTO.getPrice());
            ticketAdd.setReleaseRate(ticketAddDTO.getReleaseRate());
            ticketAdd.setNumberOfTickets(ticketAddDTO.getNumberOfTickets());
            ticketAdd.setUser(optionalUser.get());
            ticketAddRepository.save(ticketAdd);
            return true;
        }
        return false;
    }

    public List<TicketAddDTO> getAllTicketAdds(long userId) {
        return ticketAddRepository.findAllByUserId(userId).stream().map(TicketAdd::getTicketAddDTO).collect(Collectors.toList());
    }

    @Override
    public void increaseTicketCount(Long ticketId) {

    }

    @Override
    public boolean buyTicket(Long ticketId) {
        return false;
    }

    public boolean buyTicket(Long ticketId, Map<String, String> buyerDetails, double price) {
        Optional<TicketAdd> optionalTicketAdd = ticketAddRepository.findById(ticketId);
        if (optionalTicketAdd.isPresent()) {
            TicketAdd ticketAdd = optionalTicketAdd.get();
            Buyer buyer = new Buyer();
            buyer.setFirstName(buyerDetails.get("firstName"));
            buyer.setPhoneNumber(buyerDetails.get("phoneNumber"));
            buyer.setPrice(price);
            buyer.setTimestamp(LocalDateTime.now());
            buyer.setTicket(ticketAdd);
            buyerRepository.save(buyer);
            return true;
        }
        return false;
    }

    public boolean deleteTicket(Long ticketId) {
        Optional<TicketAdd> optionalTicketAdd = ticketAddRepository.findById(ticketId);
        if (optionalTicketAdd.isPresent()) {
            ticketAddRepository.delete(optionalTicketAdd.get());
            return true;
        }
        return false;
    }

    public List<Buyer> getBuyersByTicketId(Long ticketId) {
        return buyerRepository.findAllByTicketId(ticketId);
    }
}