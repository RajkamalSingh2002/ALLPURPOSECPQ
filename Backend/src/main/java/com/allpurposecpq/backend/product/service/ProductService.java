package com.allpurposecpq.backend.product.service;

import com.allpurposecpq.backend.product.dto.OfferingDto;
import com.allpurposecpq.backend.product.dto.ProductDto;

import java.util.List;

public interface ProductService {

    // Product
    List<ProductDto> getActiveProducts();
    ProductDto getProduct(long id);
    ProductDto createProduct(ProductDto dto);
    ProductDto updateProduct(long id, ProductDto dto);
    void deleteProduct(long id);

    // Offering
    List<OfferingDto> getActiveOfferings();
    OfferingDto getOffering(long id);
    OfferingDto createOffering(OfferingDto dto);
    OfferingDto updateOffering(long id, OfferingDto dto);
    void deleteOffering(long id);
}
