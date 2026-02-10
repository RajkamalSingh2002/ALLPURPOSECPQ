package com.allpurposecpq.backend.controller;

import com.allpurposecpq.backend.dto.OfferingDto;
import com.allpurposecpq.backend.dto.ProductDto;
import com.allpurposecpq.backend.service.ProductService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/products")
    public List<ProductDto> getProducts() {
        return productService.getActiveProducts();
    }

    @GetMapping("/products/{id}")
    public ProductDto getProduct(@PathVariable long id) {
        return productService.getProduct(id);
    }

    @GetMapping("/offerings")
    public List<OfferingDto> getOfferings() {
        return productService.getActiveOfferings();
    }

    @GetMapping("/offerings/{id}")
    public OfferingDto getOffering(@PathVariable long id) {
        return productService.getOffering(id);
    }
}
