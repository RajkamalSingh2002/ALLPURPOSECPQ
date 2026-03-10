package com.allpurposecpq.backend.auth.controller;

import com.allpurposecpq.backend.auth.dto.LoginRequest;
import com.allpurposecpq.backend.auth.dto.LoginResponse;
import com.allpurposecpq.backend.auth.dto.RegisterRequest;
import com.allpurposecpq.backend.auth.dto.TokenRefreshRequest;
import com.allpurposecpq.backend.auth.dto.TokenRefreshResponse;
import com.allpurposecpq.backend.auth.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping("/refresh")
    public ResponseEntity<TokenRefreshResponse> refresh(@RequestBody TokenRefreshRequest request) {
        return ResponseEntity.ok(authService.refresh(request));
    }

    @PostMapping("/register")
    public ResponseEntity<Void> register(@RequestBody RegisterRequest request) {
        authService.register(request);
        return ResponseEntity.ok().build();
    }
}
