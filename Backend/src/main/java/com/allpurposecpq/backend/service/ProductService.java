package com.allpurposecpq.backend.service;

import com.allpurposecpq.backend.domain.ProductRepository;
import com.allpurposecpq.backend.dto.OfferingDto;
import com.allpurposecpq.backend.dto.ProductDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<ProductDto> getActiveProducts() {
        return productRepository.findAllActive();
    }

    public ProductDto getProduct(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Product not found: " + id));
    }

    public List<OfferingDto> getActiveOfferings() {
        return productRepository.findAllOfferingsActive();
    }

    public OfferingDto getOffering(long id) {
        return productRepository.findOfferingById(id)
                .orElseThrow(() -> new IllegalArgumentException("Offering not found: " + id));
    }
}
