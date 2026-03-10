package com.allpurposecpq.backend.product.controller;

import com.allpurposecpq.backend.product.dto.OfferingDto;
import com.allpurposecpq.backend.product.service.ProductService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offerings")
public class OfferingController {

    private final ProductService productService;

    public OfferingController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<OfferingDto>> getAll() {
        return ResponseEntity.ok(productService.getActiveOfferings());
    }

    @GetMapping("/{id}")
    public ResponseEntity<OfferingDto> getById(@PathVariable long id) {
        return ResponseEntity.ok(productService.getOffering(id));
    }

    @PostMapping
    public ResponseEntity<OfferingDto> create(@RequestBody OfferingDto dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createOffering(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<OfferingDto> update(@PathVariable long id,
                                              @RequestBody OfferingDto dto) {
        return ResponseEntity.ok(productService.updateOffering(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable long id) {
        productService.deleteOffering(id);
        return ResponseEntity.noContent().build();
    }
}
