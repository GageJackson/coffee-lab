package com.macguffin.coffeelab.dao;

import com.macguffin.coffeelab.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {

}
