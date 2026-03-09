package com.allpurposecpq.backend.domain.service;

import com.allpurposecpq.backend.domain.repository.DomainRepository;
import com.allpurposecpq.backend.cpq.appconfig.dto.ConfigItemDto;
import com.allpurposecpq.backend.domain.dto.DomainDto;
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
