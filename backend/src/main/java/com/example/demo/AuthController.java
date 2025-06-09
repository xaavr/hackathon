package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.example.demo.models.User;
import com.example.demo.models.Stock;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/stocks")
    public ResponseEntity<?> getStocks() {
        User user = getCurrentUser();
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok(user.getStocks());
    }

    @PostMapping("/stocks")
    public ResponseEntity<?> addStock(@RequestBody Stock stock) {
        User user = getCurrentUser();
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        user.getStocks().add(stock);
        userRepository.save(user);
        return ResponseEntity.ok("Stock added successfully");
    }

    @DeleteMapping("/stocks/{stockId}")
    public ResponseEntity<?> removeStock(@PathVariable Long stockId) {
        User user = getCurrentUser();
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        boolean removed = user.getStocks().removeIf(stock -> stock.getId().equals(stockId));
        if (!removed) {
            return ResponseEntity.status(404).body("Stock not found");
        }
        userRepository.save(user);
        return ResponseEntity.ok("Stock removed successfully");
    }

    private User getCurrentUser() {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByUsername(currentUsername);
    }
}
