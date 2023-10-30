package com.macguffin.coffeelab.dao;

import com.macguffin.coffeelab.entity.Coffee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface CoffeeRepository extends JpaRepository<Coffee, Long> {
    Page<Coffee> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
}
