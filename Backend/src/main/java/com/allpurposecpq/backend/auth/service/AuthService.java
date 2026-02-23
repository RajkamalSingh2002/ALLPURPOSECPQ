package com.allpurposecpq.backend.auth.service;

import com.allpurposecpq.backend.auth.dto.LoginRequest;
import com.allpurposecpq.backend.auth.dto.LoginResponse;
import com.allpurposecpq.backend.auth.dto.RegisterRequest;
import com.allpurposecpq.backend.auth.dto.TokenRefreshRequest;
import com.allpurposecpq.backend.auth.dto.TokenRefreshResponse;
import com.allpurposecpq.backend.auth.model.RefreshToken;
import com.allpurposecpq.backend.auth.repository.RefreshTokenRepository;
import com.allpurposecpq.backend.security.JwtTokenProvider;
import com.allpurposecpq.backend.user.model.AuRole;
import com.allpurposecpq.backend.user.model.AuUser;
import com.allpurposecpq.backend.user.repository.AuUserRepository;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.OffsetDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AuthService {

    private final AuUserRepository auUserRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;
    private final JdbcTemplate jdbcTemplate;

    public AuthService(
            AuUserRepository auUserRepository,
            RefreshTokenRepository refreshTokenRepository,
            JwtTokenProvider jwtTokenProvider,
            PasswordEncoder passwordEncoder,
            JdbcTemplate jdbcTemplate
    ) {
        this.auUserRepository = auUserRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional(readOnly = true)
    public LoginResponse login(LoginRequest request) {
        Optional<AuUser> userOpt = auUserRepository.findByUsername(request.getUsername());
        if (userOpt.isEmpty()) throw new RuntimeException("Invalid username or password");

        AuUser user = userOpt.get();

        if (user.getEnabled() == null || user.getEnabled() == 0) {
            throw new RuntimeException("User is disabled");
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid username or password");
        }

        List<String> roleNames = loadUserRoleNames(user);

        String accessToken = jwtTokenProvider.generateAccessToken(
                user.getId(),
                user.getUsername(),
                roleNames,
                user.getDomainId()
        );

        String refreshTokenString = jwtTokenProvider.generateRefreshToken(user.getId());

        RefreshToken refreshToken = new RefreshToken();
        refreshToken.setUserId(user.getId());
        refreshToken.setToken(refreshTokenString);
        refreshToken.setExpiryDate(jwtTokenProvider.getExpiryFromToken(refreshTokenString));
        refreshToken.setCreatedDate(OffsetDateTime.now());
        refreshToken.setRevoked(0);

        refreshTokenRepository.save(refreshToken);

        cleanupOldTokensForUser(user.getId(), 5);

        LoginResponse response = new LoginResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshTokenString);
        response.setUsername(user.getUsername());
        response.setRoles(roleNames);
        return response;
    }

    private void cleanupOldTokensForUser(Long userId, int maxTokens) {
        String sql = """
                DELETE FROM REFRESH_TOKEN
                WHERE ID IN (
                    SELECT ID
                    FROM REFRESH_TOKEN
                    WHERE USER_ID = ?
                    ORDER BY CREATED_DATE DESC
                    OFFSET ? ROWS
                )
                """;
        jdbcTemplate.update(sql, userId, maxTokens);
    }

    @Transactional(readOnly = true)
    public TokenRefreshResponse refresh(TokenRefreshRequest request) {
        String incomingToken = request.getRefreshToken();

        RefreshToken stored = refreshTokenRepository.findByToken(incomingToken)
                .orElseThrow(() -> new RuntimeException("Invalid refresh token"));

        if (stored.getRevoked() != null && stored.getRevoked() == 1) {
            throw new RuntimeException("Refresh token revoked");
        }

        if (stored.getExpiryDate().isBefore(OffsetDateTime.now())) {
            throw new RuntimeException("Refresh token expired");
        }

        AuUser user = auUserRepository.findById(stored.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        List<String> roleNames = loadUserRoleNames(user);

        String newAccessToken = jwtTokenProvider.generateAccessToken(
                user.getId(),
                user.getUsername(),
                roleNames,
                user.getDomainId()
        );

        TokenRefreshResponse response = new TokenRefreshResponse();
        response.setAccessToken(newAccessToken);
        response.setRefreshToken(incomingToken);
        response.setUsername(user.getUsername());
        response.setRoles(roleNames);
        return response;
    }

    @Transactional
    public void register(RegisterRequest request) {
        Optional<AuUser> existing = auUserRepository.findByUsername(request.getUsername());
        if (existing.isPresent()) throw new RuntimeException("Username already exists");

        AuUser user = new AuUser();
        user.setDomainId(request.getDomainId());
        user.setUsername(request.getUsername());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setFullName(request.getFullName());
        user.setEnabled(1);
        user.setModifiedBy("SYSTEM");
        user.setModifiedDate(OffsetDateTime.now());

        auUserRepository.save(user);
        // If you need default roles on register, assign user.setRoles(...) and save again.
    }

    private List<String> loadUserRoleNames(AuUser user) {
        List<AuRole> roles = user.getRoles();
        if (roles == null || roles.isEmpty()) return new ArrayList<>();
        return roles.stream().map(AuRole::getName).distinct().toList();
    }
}
