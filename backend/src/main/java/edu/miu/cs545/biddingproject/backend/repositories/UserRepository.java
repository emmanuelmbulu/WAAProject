package edu.miu.cs545.biddingproject.backend.repositories;

import edu.miu.cs545.biddingproject.backend.domains.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmailIgnoreCase(String email);
}
