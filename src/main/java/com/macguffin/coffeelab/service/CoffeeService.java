package com.macguffin.coffeelab.service;

import com.macguffin.coffeelab.dao.CheckoutRepository;
import com.macguffin.coffeelab.dao.CoffeeRepository;
import com.macguffin.coffeelab.dao.HistoryRepository;
import com.macguffin.coffeelab.entity.Checkout;
import com.macguffin.coffeelab.entity.Coffee;
import com.macguffin.coffeelab.entity.History;
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
    private HistoryRepository historyRepository;

    public CoffeeService(CoffeeRepository coffeeRepository, CheckoutRepository checkoutRepository, HistoryRepository historyRepository) {
        this.coffeeRepository = coffeeRepository;
        this.checkoutRepository = checkoutRepository;
        this.historyRepository = historyRepository;
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

    public void returnCoffee (String userEmail, Long coffeeId) throws Exception{
        Optional<Coffee> coffee = coffeeRepository.findById(coffeeId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndCoffeeId(userEmail, coffeeId);

        if (!coffee.isPresent() || validateCheckout == null) {
            throw new Exception("Coffee does not exist or not checked out by user");
        }

        coffee.get().setCopiesAvailable(coffee.get().getCopiesAvailable() + 1);

        coffeeRepository.save(coffee.get());
        checkoutRepository.deleteById(validateCheckout.getId());

        History history = new History(
                userEmail,
                validateCheckout.getCheckoutDate(),
                LocalDate.now().toString(),
                coffee.get().getName(),
                coffee.get().getCountry(),
                coffee.get().getDescription(),
                coffee.get().getImg()
        );

        historyRepository.save(history);
    }

    public void renewLoan (String userEmail, Long coffeeId) throws Exception{
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndCoffeeId(userEmail, coffeeId);

        if (validateCheckout == null) {
            throw new Exception("Coffee does not exist or not checked out by user");
        }

        SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");
        Date d1 = sdf.parse(validateCheckout.getReturnDate());
        Date d2 = sdf.parse(LocalDate.now().toString());

        if (d1.compareTo(d2) > 0 || d1.compareTo(d2) == 0) {
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);
        }
    }

    public List<History> getHistories(String userEmail) throws Exception{
        List<History> histories = historyRepository.findHistoryByUserEmail(userEmail);

        if (histories == null) {
            throw new Exception("No histories");
        }

        return histories;
    }
}
