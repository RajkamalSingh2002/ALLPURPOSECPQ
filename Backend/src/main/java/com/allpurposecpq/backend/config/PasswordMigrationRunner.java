package com.allpurposecpq.backend.config;

import com.allpurposecpq.backend.user.model.AuUser;
import com.allpurposecpq.backend.user.repository.AuUserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class PasswordMigrationRunner {

    @Bean
    public CommandLineRunner migratePlaintextPasswords(AuUserRepository auUserRepository,
                                                       PasswordEncoder passwordEncoder) {
        return args -> {
            Iterable<AuUser> users = auUserRepository.findAll();

            for (AuUser user : users) {
                String current = user.getPasswordHash();

                // Skip null/empty
                if (current == null || current.isBlank()) {
                    continue;
                }

                // Skip if it already looks like a bcrypt hash
                if (isBcrypt(current)) {
                    continue;
                }

                // At this point we assume it's plaintext and encode it
                String hashed = passwordEncoder.encode(current);
                user.setPasswordHash(hashed);
                auUserRepository.save(user);

                System.out.println("Migrated password for user " + user.getUsername());
            }
        };
    }

    private boolean isBcrypt(String value) {
        // Basic heuristic: bcrypt hashes start with $2a, $2b, or $2y and are ~60 chars
        return value != null
                && value.startsWith("$2")
                && value.length() >= 55;
    }
}
