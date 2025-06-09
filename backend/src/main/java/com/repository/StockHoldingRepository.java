package com.repository;
import org.springframework.data.jpa.repository.JpaRepository; // Import JpaRepository
import model.StockHolding; // Import StockHolding model
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface StockHoldingRepository extends JpaRepository<StockHolding, Long> {}
