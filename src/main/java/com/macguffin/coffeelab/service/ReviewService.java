package com.macguffin.coffeelab.service;

import com.macguffin.coffeelab.dao.CoffeeRepository;
import com.macguffin.coffeelab.dao.ReviewRepository;
import com.macguffin.coffeelab.entity.Review;
import com.macguffin.coffeelab.requestmodels.ReviewRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.time.LocalDate;

@Service
@Transactional
public class ReviewService {

    private ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public void postReview(String userEmail, ReviewRequest reviewRequest) throws Exception {
        Review validateReview = reviewRepository.findByUserEmailAndCoffeeId(userEmail, reviewRequest.getCoffeeId());
        if (validateReview != null) {
            throw new Exception("Review already created");
        }
        Review review = new Review();
        review.setCoffeeId(reviewRequest.getCoffeeId());
        review.setRating(reviewRequest.getRating());
        review.setUserEmail(userEmail);
        if (reviewRequest.getReviewDescription().isPresent()) {
            review.setReviewDescription(reviewRequest.getReviewDescription()
                    .map(Object::toString)
                    .orElse(null)
            );
        }
        review.setDate(Date.valueOf(LocalDate.now()));
        reviewRepository.save(review);
    }

    public boolean userReviewListed(String userEmail, Long coffeeId) {
        Review validateReview = reviewRepository.findByUserEmailAndCoffeeId(userEmail, coffeeId);
        if (validateReview != null) {
           return true;
        } else {
            return false;
        }
    }
}
