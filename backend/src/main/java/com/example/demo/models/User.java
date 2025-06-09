package com.example.demo.models;

import jakarta.persistence.*;
import com.fasterxml.jackson.databind.ObjectMapper; // Import for JSON conversion
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users") // Use a custom table name to avoid conflicts with reserved keywords
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String password;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Stock> stocks = new ArrayList<>();

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Stock> getStocks() {
        return stocks;
    }

    public void setStocks(List<Stock> stocks) {
        this.stocks = stocks;
    }

    // Method to add a stock
    public void addStock(Stock stock) {
        this.stocks.add(stock);
    }

    // Method to get all stocks as JSON
    public String getStocksAsJson() {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            return objectMapper.writeValueAsString(this.stocks);
        } catch (Exception e) {
            e.printStackTrace();
            return "[]"; // Return empty JSON array in case of error
        }
    }
}