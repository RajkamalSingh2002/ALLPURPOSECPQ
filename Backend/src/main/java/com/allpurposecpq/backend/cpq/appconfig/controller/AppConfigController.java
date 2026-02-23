package com.allpurposecpq.backend.cpq.appconfig.controller;

import com.allpurposecpq.backend.cpq.appconfig.model.AppConfig;
import com.allpurposecpq.backend.cpq.appconfig.service.AppConfigService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/config")
public class AppConfigController {

    private final AppConfigService appConfigService;

    public AppConfigController(AppConfigService appConfigService) {
        this.appConfigService = appConfigService;
    }

    // GET /api/config?domainId=101
    @GetMapping
    public ResponseEntity<List<AppConfig>> getConfigs(
            @RequestParam Long domainId,
            @RequestParam(required = false) String grp) {

        if (grp != null) {
            return ResponseEntity.ok(appConfigService.getActiveConfigsByGroup(domainId, grp));
        }
        return ResponseEntity.ok(appConfigService.getActiveConfigs(domainId));
    }

    // GET /api/config/15
    @GetMapping("/{id}")
    public ResponseEntity<AppConfig> getConfigById(@PathVariable Long id) {
        return appConfigService.getActiveConfigById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/config
    @PostMapping
    public ResponseEntity<AppConfig> createConfig(@RequestBody AppConfig config) {
        return ResponseEntity.ok(appConfigService.createConfig(config));
    }

    // PUT /api/config/15
    @PutMapping("/{id}")
    public ResponseEntity<AppConfig> updateConfig(@PathVariable Long id, @RequestBody AppConfig config) {
        return appConfigService.updateConfig(id, config)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT /api/config/15/deactivate
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<AppConfig> deactivateConfig(@PathVariable Long id) {
        return appConfigService.deactivateConfig(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
