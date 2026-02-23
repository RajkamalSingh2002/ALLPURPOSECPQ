package com.allpurposecpq.backend.cpq.item.controller;

import com.allpurposecpq.backend.cpq.item.model.Item;
import com.allpurposecpq.backend.cpq.item.service.ItemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/item")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    // GET all active items for a domain
    // GET /api/item?domainId=101
    @GetMapping
    public ResponseEntity<List<Item>> getItems(@RequestParam Long domainId) {
        return ResponseEntity.ok(itemService.getActiveItems(domainId));
    }

    // GET single item by id
    // GET /api/item/15
    @GetMapping("/{id}")
    public ResponseEntity<Item> getItemById(@PathVariable Long id) {
        return itemService.getActiveItemById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST - create new item
    // POST /api/item
    @PostMapping
    public ResponseEntity<Item> createItem(@RequestBody Item item) {
        Item created = itemService.createItem(item);
        return ResponseEntity.ok(created);
    }

    // PUT - update existing item
    // PUT /api/item/15
    @PutMapping("/{id}")
    public ResponseEntity<Item> updateItem(@PathVariable Long id, @RequestBody Item item) {
        return itemService.updateItem(id, item)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // PUT - deactivate item (sets stopDate instead of deleting)
    // PUT /api/item/15/deactivate
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<Item> deactivateItem(@PathVariable Long id) {
        return itemService.deactivateItem(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
