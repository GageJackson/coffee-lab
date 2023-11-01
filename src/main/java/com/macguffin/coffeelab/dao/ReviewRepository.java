package com.macguffin.coffeelab.dao;

import com.macguffin.coffeelab.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.RequestParam;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    Page<Review> findByCoffeeId(@RequestParam("coffee_id") Long coffeeId, Pageable pageable);

}
