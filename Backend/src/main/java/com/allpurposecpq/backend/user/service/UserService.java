package com.allpurposecpq.backend.user.service;

import com.allpurposecpq.backend.user.model.AuUser;
import com.allpurposecpq.backend.user.repository.AuUserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final AuUserRepository auUserRepository;

    public UserService(AuUserRepository auUserRepository) {
        this.auUserRepository = auUserRepository;
    }

    public Optional<AuUser> findByUsername(String username) {
        return auUserRepository.findByUsername(username);
    }

    public AuUser save(AuUser user) {
        return auUserRepository.save(user);
    }
}
