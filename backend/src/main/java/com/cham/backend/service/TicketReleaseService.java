package com.cham.backend.service;

import com.cham.backend.entity.TicketAdd;
import com.cham.backend.repository.TicketAddRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

@Service
public class TicketReleaseService {
    @Autowired
    private TicketAddRepository ticketAddRepository;

    private final ScheduledExecutorService scheduler = Executors.newScheduledThreadPool(1);

    public void scheduleTicketRelease(TicketAdd ticketAdd) {
        Runnable task = new Runnable() {
            private int ticketsReleased = 0;

            @Override
            public void run() {
                if (ticketsReleased < ticketAdd.getNumberOfTickets()) {
                    // Logic to increase ticket count
                    ticketsReleased++;
                    System.out.println("Released ticket " + ticketsReleased + " for " + ticketAdd.getTitle());
                } else {
                    scheduler.shutdown();
                }
            }
        };

        scheduler.scheduleAtFixedRate(task, 0, ticketAdd.getReleaseRate(), TimeUnit.SECONDS);
    }

    @Scheduled(fixedRate = 60000) // Check every minute
    public void checkAndScheduleTickets() {
        List<TicketAdd> tickets = ticketAddRepository.findAll();
        for (TicketAdd ticket : tickets) {
            scheduleTicketRelease(ticket);
        }
    }
}