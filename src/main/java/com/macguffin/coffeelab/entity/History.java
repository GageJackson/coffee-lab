package com.macguffin.coffeelab.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "history")
@Data
public class History {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    @Column(name = "user_email")
    private String userEmail;
    @Column(name = "checkout_date")
    private String checkoutDate;
    @Column(name = "returned_date")
    private String returnedDate;
    @Column(name = "name")
    private String name;
    @Column(name = "country")
    private String country;
    @Column(name = "description")
    private String description;
    @Column(name = "img")
    private String img;

    public History() {}

    public History(String userEmail, String checkoutDate, String returnedDate, String name, String country, String description, String img) {
        this.userEmail = userEmail;
        this.checkoutDate = checkoutDate;
        this.returnedDate = returnedDate;
        this.name = name;
        this.country = country;
        this.description = description;
        this.img = img;
    }
}
