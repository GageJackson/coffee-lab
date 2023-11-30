package com.macguffin.coffeelab.controller;

import com.macguffin.coffeelab.entity.Coffee;
import com.macguffin.coffeelab.entity.History;
import com.macguffin.coffeelab.responsemodels.ShelfCurrentLoansResponse;
import com.macguffin.coffeelab.service.CoffeeService;
import com.macguffin.coffeelab.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/coffees")
public class CoffeeController {

    private CoffeeService coffeeService;

    @Autowired
    public CoffeeController(CoffeeService coffeeService){
        this.coffeeService = coffeeService;
    }

    @PutMapping("/secure/checkout")
    public Coffee checkoutCoffee (@RequestHeader(value = "Authorization") String token,
                                  @RequestParam Long coffeeId) throws Exception {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return coffeeService.checkoutCoffee(userEmail, coffeeId);
    }

    @GetMapping("/secure/isCheckedOut/byUser")
    public Boolean checkoutCoffeeByUser (@RequestHeader(value = "Authorization") String token,
                                         @RequestParam Long coffeeId){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return coffeeService.checkoutCoffeeByUser(userEmail, coffeeId);
    }

    @GetMapping("/secure/currentLoans/count")
    public int currentLoansCount (@RequestHeader(value = "Authorization") String token){
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return coffeeService.currentLoansCount(userEmail);
    }

    @GetMapping("/secure/currentLoans")
    public List<ShelfCurrentLoansResponse> currentLoans(@RequestHeader(value = "Authorization") String token)
        throws Exception
    {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return coffeeService.currentLoans(userEmail);
    }

    @PutMapping("/secure/return")
    public void returnCoffee(@RequestHeader(value = "Authorization") String token,
                             @RequestParam Long coffeeId) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        coffeeService.returnCoffee(userEmail, coffeeId);
    }

    @PutMapping("/secure/renew")
    public void renewLoan(@RequestHeader(value = "Authorization") String token,
                             @RequestParam Long coffeeId) throws Exception{
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        coffeeService.renewLoan(userEmail, coffeeId);
    }

    @GetMapping("/secure/histories")
    public List<History> getHistories(@RequestHeader(value = "Authorization") String token)
            throws Exception
    {
        String userEmail = ExtractJWT.payloadJWTExtraction(token, "\"sub\"");
        return coffeeService.getHistories(userEmail);
    }
}
