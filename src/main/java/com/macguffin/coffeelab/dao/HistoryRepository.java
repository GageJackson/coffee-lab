package com.macguffin.coffeelab.dao;

import com.macguffin.coffeelab.entity.History;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface HistoryRepository extends JpaRepository<History, Long> {
    Page<History> findCoffeesByUserEmail(@RequestParam("email") String userEmail, Pageable pageable);
    List<History> findHistoryByUserEmail(@RequestParam("email") String userEmail);
}
