package com.repository;
import model.User; // Import User model
import org.springframework.data.jpa.repository.JpaRepository; // Import JpaRepository
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource
public interface UserRepository extends JpaRepository<User, Long> {}
