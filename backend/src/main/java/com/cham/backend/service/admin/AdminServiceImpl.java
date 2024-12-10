package com.cham.backend.service.admin;

import com.cham.backend.dto.TicketAddDTO;
import com.cham.backend.entity.TicketAdd;
import com.cham.backend.entity.User;
import com.cham.backend.repository.TicketAddRepository;
import com.cham.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TicketAddRepository ticketAddRepository;

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
}