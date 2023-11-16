package com.macguffin.coffeelab.requestmodels;

import lombok.Data;
import java.util.Optional;

@Data
public class ReviewRequest {
    private double rating;
    private Long coffeeId;
    private Optional<String> reviewDescription;
}
