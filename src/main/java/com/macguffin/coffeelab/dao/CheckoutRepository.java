package com.macguffin.coffeelab.dao;

import com.macguffin.coffeelab.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Checkout findByUserEmailAndCoffeeId(String userEmail, Long coffeeId);
    List<Checkout> findCoffeesByUserEmail(String userEmail);
}
