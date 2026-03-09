package com.allpurposecpq.backend.product.controller;

import com.allpurposecpq.backend.product.dto.OfferingDto;
import com.allpurposecpq.backend.product.service.ProductService;
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
    public List<OfferingDto> getOfferings() {
        return productService.getActiveOfferings();
    }

    @GetMapping("/{id}")
    public OfferingDto getOffering(@PathVariable long id) {
        return productService.getOffering(id);
    }
}
