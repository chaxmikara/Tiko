package com.cham.backend.entity;

import com.cham.backend.dto.TicketAddDTO;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.Date;
import java.util.Set;


@Entity
@Table(name = "tickets")
@Data
public class TicketAdd {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private double price;
    private int releaseRate;
    private int numberOfTickets;
    private String date;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] img;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    private User user;


    public TicketAddDTO getTicketAddDTO() {
        TicketAddDTO ticketAddDTO = new TicketAddDTO();

        ticketAddDTO.setId(id);
        ticketAddDTO.setTitle(title);
        ticketAddDTO.setDescription(description);
        ticketAddDTO.setPrice(price);
        ticketAddDTO.setReturnedImg(img);
        ticketAddDTO.setReleaseRate(releaseRate);
        ticketAddDTO.setNumberOfTickets(numberOfTickets);
        ticketAddDTO.setDate(date);

        return ticketAddDTO;
    }




}
