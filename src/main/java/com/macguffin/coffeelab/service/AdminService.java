package com.macguffin.coffeelab.service;

import com.macguffin.coffeelab.dao.CheckoutRepository;
import com.macguffin.coffeelab.dao.CoffeeRepository;
import com.macguffin.coffeelab.dao.ReviewRepository;
import com.macguffin.coffeelab.entity.Coffee;
import com.macguffin.coffeelab.requestmodels.AddCoffeeRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class AdminService {

    private CoffeeRepository coffeeRepository;
    private ReviewRepository reviewRepository;
    private CheckoutRepository checkoutRepository;

    @Autowired
    public AdminService (CoffeeRepository coffeeRepository,
                         ReviewRepository reviewRepository,
                         CheckoutRepository checkoutRepository) {
        this.coffeeRepository = coffeeRepository;
        this.reviewRepository = reviewRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public void increaseCoffeeQuantity(Long coffeeId) throws Exception {

        Optional<Coffee> coffee = coffeeRepository.findById(coffeeId);

        if (!coffee.isPresent()) {
            throw new Exception("Book not found");
        }

        coffee.get().setCopiesAvailable(coffee.get().getCopiesAvailable() + 1);
        coffee.get().setCopies(coffee.get().getCopies() + 1);

        coffeeRepository.save(coffee.get());
    }

    public void decreaseCoffeeQuantity(Long coffeeId) throws Exception {

        Optional<Coffee> coffee = coffeeRepository.findById(coffeeId);

        if (!coffee.isPresent() || coffee.get().getCopiesAvailable() <= 0 || coffee.get().getCopies() <= 0) {
            throw new Exception("Book not found or quantity locked");
        }

        coffee.get().setCopiesAvailable(coffee.get().getCopiesAvailable() - 1);
        coffee.get().setCopies(coffee.get().getCopies() - 1);

        coffeeRepository.save(coffee.get());
    }

    public void postCoffee(AddCoffeeRequest addCoffeeRequest) {
        Coffee coffee = new Coffee();
        coffee.setName(addCoffeeRequest.getName());
        coffee.setCountry(addCoffeeRequest.getCountry());
        coffee.setDescription(addCoffeeRequest.getDescription());
        coffee.setCopies(addCoffeeRequest.getCopies());
        coffee.setCopiesAvailable(addCoffeeRequest.getCopies());
        coffee.setCategory(addCoffeeRequest.getCategory());
        coffee.setImg(addCoffeeRequest.getImg());
        coffeeRepository.save(coffee);
    }

    public void deleteCoffee(Long coffeeId) throws Exception {

        Optional<Coffee> coffee = coffeeRepository.findById(coffeeId);

        if (!coffee.isPresent()) {
            throw new Exception("Book not found");
        }

        coffeeRepository.delete(coffee.get());
        checkoutRepository.deleteAllByCoffeeId(coffeeId);
        reviewRepository.deleteAllByCoffeeId(coffeeId);
    }
}
