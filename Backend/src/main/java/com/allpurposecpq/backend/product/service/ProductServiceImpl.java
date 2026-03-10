package com.allpurposecpq.backend.product.service;

import com.allpurposecpq.backend.product.dto.OfferingDto;
import com.allpurposecpq.backend.product.dto.ProductDto;
import com.allpurposecpq.backend.product.repository.OfferingRepository;
import com.allpurposecpq.backend.product.repository.ProductRepository;
import com.allpurposecpq.backend.shared.exception.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final OfferingRepository offeringRepository;

    public ProductServiceImpl(ProductRepository productRepository,
                              OfferingRepository offeringRepository) {
        this.productRepository = productRepository;
        this.offeringRepository = offeringRepository;
    }

    @Override
    public List<ProductDto> getActiveProducts() {
        return productRepository.findAllActive();
    }

    @Override
    public ProductDto getProduct(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + id));
    }

    @Override
    public List<OfferingDto> getActiveOfferings() {
        return offeringRepository.findAllActive();
    }

    @Override
    public OfferingDto getOffering(long id) {
        return offeringRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offering not found with id: " + id));
    }
}
