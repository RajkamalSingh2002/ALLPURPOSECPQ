package com.allpurposecpq.backend.service;

import com.allpurposecpq.backend.domain.DomainRepository;
import com.allpurposecpq.backend.dto.ConfigItemDto;
import com.allpurposecpq.backend.dto.DomainDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DomainService {

    private final DomainRepository domainRepository;

    public DomainService(DomainRepository domainRepository) {
        this.domainRepository = domainRepository;
    }

    public DomainDto getDomain(long id) {
        return domainRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Domain not found: " + id));
    }

    public List<DomainDto> getAllDomains() {
        return domainRepository.findAll();
    }

    public List<ConfigItemDto> getConfigForDomain(long domainId) {
        return domainRepository.findConfigByDomain(domainId);
    }
}
