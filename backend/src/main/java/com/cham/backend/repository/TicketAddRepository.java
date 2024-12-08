package com.cham.backend.repository;

import com.cham.backend.entity.TicketAdd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketAddRepository extends JpaRepository<TicketAdd, Long> {
}