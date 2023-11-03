package com.macguffin.coffeelab.service;

import com.macguffin.coffeelab.dao.CheckoutRepository;
import com.macguffin.coffeelab.dao.CoffeeRepository;
import com.macguffin.coffeelab.entity.Checkout;
import com.macguffin.coffeelab.entity.Coffee;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.Optional;

@Service
@Transactional
public class CoffeeService {

    private CoffeeRepository coffeeRepository;
    private CheckoutRepository checkoutRepository;

    public CoffeeService(CoffeeRepository coffeeRepository, CheckoutRepository checkoutRepository) {
        this.coffeeRepository = coffeeRepository;
        this.checkoutRepository = checkoutRepository;
    }

    public Coffee checkoutCoffee (String userEmail, Long coffeeId) throws Exception {
        Optional<Coffee> coffee = coffeeRepository.findById(coffeeId);
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndCoffeeId(userEmail, coffeeId);

        if (!coffee.isPresent() || validateCheckout != null || coffee.get().getCopiesAvailable() <= 0) {
            throw new Exception("Coffee doesn't exist or is already checked out by user");
        }

        coffee.get().setCopiesAvailable(coffee.get().getCopiesAvailable() - 1);
        coffeeRepository.save(coffee.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays(7).toString(),
                coffee.get().getId()
        );

        checkoutRepository.save(checkout);

        return coffee.get();
    }

    public Boolean checkoutCoffeeByUser(String userEmail, Long coffeeId) {
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndCoffeeId(userEmail, coffeeId);
        return validateCheckout != null;
    }

    public int currentLoansCount(String userEmail) {
        return checkoutRepository.findCoffeesByUserEmail(userEmail).size();
    }
}
