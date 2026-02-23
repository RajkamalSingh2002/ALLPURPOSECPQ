package com.allpurposecpq.backend.user.repository;

import com.allpurposecpq.backend.user.model.AuUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AuUserRepository extends JpaRepository<AuUser, Long> {

    Optional<AuUser> findByUsername(String username);
}
