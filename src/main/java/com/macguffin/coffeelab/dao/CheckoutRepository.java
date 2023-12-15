package com.macguffin.coffeelab.dao;

import com.macguffin.coffeelab.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface CheckoutRepository extends JpaRepository<Checkout, Long> {
    Checkout findByUserEmailAndCoffeeId(String userEmail, Long coffeeId);
    List<Checkout> findCoffeesByUserEmail(String userEmail);

    @Modifying
    @Query("delete from Checkout where coffeeId in :coffee_id")
    void deleteAllByCoffeeId(@Param("coffee_id") Long coffeeId);
}
