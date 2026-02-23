package com.allpurposecpq.backend.user.repository;

import com.allpurposecpq.backend.user.model.AuUser;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface AuUserRepository extends CrudRepository<AuUser, Long> {

    Optional<AuUser> findByUsername(String username);
}
