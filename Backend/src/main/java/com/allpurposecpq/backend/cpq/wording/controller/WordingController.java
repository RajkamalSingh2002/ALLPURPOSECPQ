package com.allpurposecpq.backend.cpq.wording.controller;

import com.allpurposecpq.backend.cpq.wording.model.Wording;
import com.allpurposecpq.backend.cpq.wording.service.WordingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wording")
public class WordingController {

    private final WordingService wordingService;

    public WordingController(WordingService wordingService) {
        this.wordingService = wordingService;
    }

    // GET /api/wording?tableName=PRODUCT
    // GET /api/wording?tableName=PRODUCT&recordId=5
    @GetMapping
    public ResponseEntity<List<Wording>> getWordings(
            @RequestParam String tableName,
            @RequestParam(required = false) Long recordId) {

        if (recordId != null) {
            return ResponseEntity.ok(wordingService.getActiveWordingsByRecord(tableName, recordId));
        }
        return ResponseEntity.ok(wordingService.getActiveWordingsByTable(tableName));
    }

    // GET /api/wording/15
    @GetMapping("/{id}")
    public ResponseEntity<Wording> getWordingById(@PathVariable Long id) {
        return wordingService.getActiveWordingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /api/wording
    @PostMapping
    public ResponseEntity<Wording> createWording(@RequestBody Wording wording) {
        return ResponseEntity.ok(wordingService.createWording(wording));
    }

    // PUT /api/wording/15
    @PutMapping("/{id}")
    public ResponseEntity<Wording> updateWording(@PathVariable Long id, @RequestBody Wording wording) {
        return wordingService.updateWording(id, wording)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT /api/wording/15/deactivate
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Wording> deactivateWording(@PathVariable Long id) {
        return wordingService.deactivateWording(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
