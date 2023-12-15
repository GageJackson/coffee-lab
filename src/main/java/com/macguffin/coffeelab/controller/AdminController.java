package com.macguffin.coffeelab.controller;

import com.macguffin.coffeelab.requestmodels.AddCoffeeRequest;
import com.macguffin.coffeelab.service.AdminService;
import com.macguffin.coffeelab.utils.ExtractJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PutMapping("/secure/increase/coffee/quantity")
    public void increaseCoffeeQuantity(@RequestHeader(value="Authorization") String token,
                                       @RequestParam Long coffeeId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.increaseCoffeeQuantity(coffeeId);
    }

    @PutMapping("/secure/decrease/coffee/quantity")
    public void decreaseCoffeeQuantity(@RequestHeader(value="Authorization") String token,
                                       @RequestParam Long coffeeId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.decreaseCoffeeQuantity(coffeeId);
    }

    @PostMapping("/secure/add/coffee")
    public void postcoffee(@RequestHeader(value="Authorization") String token,
                           @RequestBody AddCoffeeRequest addCoffeeRequest) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.postCoffee(addCoffeeRequest);
    }

    @DeleteMapping("/secure/delete/coffee")
    public void deletecoffee(@RequestHeader(value="Authorization") String token,
                             @RequestParam Long coffeeId) throws Exception {
        String admin = ExtractJWT.payloadJWTExtraction(token, "\"userType\"");
        if (admin == null || !admin.equals("admin")) {
            throw new Exception("Administration page only");
        }
        adminService.deleteCoffee(coffeeId);
    }

}

