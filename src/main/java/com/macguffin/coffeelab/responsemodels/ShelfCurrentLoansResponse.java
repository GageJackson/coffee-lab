package com.macguffin.coffeelab.responsemodels;

import com.macguffin.coffeelab.entity.Coffee;
import lombok.Data;

@Data
public class ShelfCurrentLoansResponse {

    private Coffee coffee;
    private int daysLeft;

    public ShelfCurrentLoansResponse(Coffee coffee, int daysLeft) {
        this.coffee = coffee;
        this.daysLeft = daysLeft;
    }
}
