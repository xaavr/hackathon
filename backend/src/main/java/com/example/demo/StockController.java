package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.annotation.AuthenticationPrincipal;

import java.util.List;

@RestController
@RequestMapping("/stocks")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    public StockController(StockRepository stockRepository) {
        this.stockRepository = stockRepository;
    }

    @PostMapping
    public ResponseEntity<String> addStock(@RequestBody Stock stock) {
        stockRepository.save(stock);
        return ResponseEntity.ok("Stock added successfully!");
    }

    @GetMapping
    public List<Stock> getStocksByUser(@AuthenticationPrincipal User currentUser) {
        return stockRepository.findByUserId(currentUser.getId());
    }
}
