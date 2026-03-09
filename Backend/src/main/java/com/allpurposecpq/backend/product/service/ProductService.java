package com.allpurposecpq.backend.product.service;

import com.allpurposecpq.backend.product.dto.OfferingDto;
import com.allpurposecpq.backend.product.dto.ProductDto;

import java.util.List;

public interface ProductService {
    List<ProductDto> getActiveProducts();
    ProductDto getProduct(long id);
    List<OfferingDto> getActiveOfferings();
    OfferingDto getOffering(long id);
}
