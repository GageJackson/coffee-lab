package com.macguffin.coffeelab.dao;

import com.macguffin.coffeelab.entity.Coffee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

public interface CoffeeRepository extends JpaRepository<Coffee, Long> {
    Page<Coffee> findByNameContaining(@RequestParam("name") String name, Pageable pageable);
    Page<Coffee> findByCategory(@RequestParam("category") String category, Pageable pageable);

    @Query("select o from Coffee o where id in :coffee_ids")
    List<Coffee> findCoffeesByCoffeeIds(@Param("coffee_ids") List<Long> coffeeIds);
}
