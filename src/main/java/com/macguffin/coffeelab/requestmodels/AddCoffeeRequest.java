package com.macguffin.coffeelab.requestmodels;

import lombok.Data;

@Data
public class AddCoffeeRequest {

    private String name;

    private String country;

    private String description;

    private int copies;

    private String category;

    private String img;

}
