package com.abdos.amana_app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/")
    public ResponseEntity<?> redirectToHome() {
        return ResponseEntity.ok("Welcome to the Home Page! Accessible by everyone.");
    }
    @GetMapping("/home")
    public ResponseEntity<?> homePage() {
        return ResponseEntity.ok("Welcome to the Home Page! Accessible by everyone.");
    }

    @GetMapping("/admin")
    public ResponseEntity<?> adminEndpoint() {
        return ResponseEntity.ok("Accessible by ADMIN only");
    }



    @GetMapping("/client")
    public ResponseEntity<?> clientEndpoint() {
        return ResponseEntity.ok("Accessible by CLIENT only");
    }

   @GetMapping("/livreur")
   public ResponseEntity<?> livreurEndpoint() {
       return ResponseEntity.ok("Accessible by Livreur only");
    }

}

