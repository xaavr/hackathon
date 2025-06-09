package com.example.demo;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final InMemoryUserDetailsManager userDetailsManager;
    private final PasswordEncoder passwordEncoder;

    public UserService(InMemoryUserDetailsManager userDetailsManager, PasswordEncoder passwordEncoder) {
        this.userDetailsManager = userDetailsManager;
        this.passwordEncoder = passwordEncoder;
    }

    public boolean createUser(String username, String password) {
        if (userDetailsManager.userExists(username)) {
            return false; // User already exists
        }

        UserDetails newUser = User.builder()
            .username(username)
            .password(passwordEncoder.encode(password))
            .roles("USER") // Default role assigned
            .build();

        userDetailsManager.createUser(newUser);
        return true; // User successfully created
    }
}
