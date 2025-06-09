package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final InMemoryUserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;

    public UserController(UserService userService, InMemoryUserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.userDetailsManager = userDetailsManager;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping
    public ResponseEntity<String> createUser(@RequestBody UserRequest userRequest) {
        boolean isCreated = userService.createUser(userRequest.getUsername(), userRequest.getPassword());
        if (isCreated) {
            return ResponseEntity.ok("User created successfully!");
        } else {
            return ResponseEntity.badRequest().body("User already exists.");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserRequest userRequest) {
        UserDetails userDetails = userDetailsManager.loadUserByUsername(userRequest.getUsername());
        if (userDetails != null && passwordEncoder.matches(userRequest.getPassword(), userDetails.getPassword())) {
            return ResponseEntity.ok("Login successful!");
        } else {
            return ResponseEntity.status(401).body("Invalid username or password.");
        }
    }
}
