package model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.ManyToOne;

@Entity
public class StockHolding {
    @Id @GeneratedValue Long id;
    String symbol;
    int shares;
    double avgPrice;
    @ManyToOne User owner;
    String portfolioName; // New field to associate with a portfolio

    public double getTotalValue() {
        return shares * avgPrice; // Method to calculate total value
    }
}
