package com.allpurposecpq.backend.cpq.product.service;

import com.allpurposecpq.backend.cpq.product.dto.OfferingDto;
import com.allpurposecpq.backend.cpq.product.dto.ProductDto;
import com.allpurposecpq.backend.cpq.product.repository.OfferingRepository;
import com.allpurposecpq.backend.cpq.product.repository.ProductRepository;
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

    // ── Product ────────────────────────────────────────────────

    @Override
    public List<ProductDto> getActiveProducts() {
        return productRepository.findAllActive();
    }

    @Override
    public ProductDto getProduct(long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found: " + id));
    }

    @Override
    public ProductDto createProduct(ProductDto dto) {
        long newId = productRepository.insert(dto);
        return getProduct(newId);  // fetch and return what was actually saved
    }

    @Override
    public ProductDto updateProduct(long id, ProductDto dto) {
        int rows = productRepository.update(id, dto);
        if (rows == 0) {
            throw new ResourceNotFoundException("Product not found or already deleted: " + id);
        }
        return getProduct(id);
    }

    @Override
    public void deleteProduct(long id) {
        int rows = productRepository.softDelete(id);
        if (rows == 0) {
            throw new ResourceNotFoundException("Product not found or already deleted: " + id);
        }
    }

    // ── Offering ───────────────────────────────────────────────

    @Override
    public List<OfferingDto> getActiveOfferings() {
        return offeringRepository.findAllActive();
    }

    @Override
    public OfferingDto getOffering(long id) {
        return offeringRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Offering not found: " + id));
    }

    @Override
    public OfferingDto createOffering(OfferingDto dto) {
        long newId = offeringRepository.insert(dto);
        return getOffering(newId);
    }

    @Override
    public OfferingDto updateOffering(long id, OfferingDto dto) {
        int rows = offeringRepository.update(id, dto);
        if (rows == 0) {
            throw new ResourceNotFoundException("Offering not found or already deleted: " + id);
        }
        return getOffering(id);
    }

    @Override
    public void deleteOffering(long id) {
        int rows = offeringRepository.softDelete(id);
        if (rows == 0) {
            throw new ResourceNotFoundException("Offering not found or already deleted: " + id);
        }
    }
}
