package com.macguffin.coffeelab.dao;

import com.macguffin.coffeelab.entity.Coffee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CoffeeRepository extends JpaRepository<Coffee, Long> {
}
