package com.macguffin.coffeelab.service;

import com.macguffin.coffeelab.dao.CheckoutRepository;
import com.macguffin.coffeelab.dao.CoffeeRepository;
import com.macguffin.coffeelab.entity.Checkout;
import com.macguffin.coffeelab.entity.Coffee;
import com.macguffin.coffeelab.responsemodels.ShelfCurrentLoansResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

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

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception {
        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findCoffeesByUserEmail(userEmail);

        List<Long> coffeeIdList = new ArrayList<>();

        for (Checkout coffee : checkoutList) {
            coffeeIdList.add(coffee.getCoffeeId());
        }

        List<Coffee> coffees = coffeeRepository.findCoffeesByCoffeeIds(coffeeIdList);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for (Coffee coffee : coffees) {
            Optional<Checkout> checkout = checkoutList.stream()
                    .filter(x -> x.getCoffeeId() == coffee.getId()).findFirst();

            if (checkout.isPresent()) {
                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long difference_In_Time = time.convert(d1.getTime() - d2.getTime(), TimeUnit.MILLISECONDS);

                shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(coffee, (int) difference_In_Time));
            }
        }

        return shelfCurrentLoansResponses;
    }
}
