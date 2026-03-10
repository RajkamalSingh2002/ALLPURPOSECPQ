package com.allpurposecpq.backend.domain.controller;

import com.allpurposecpq.backend.cpq.appconfig.dto.ConfigItemDto;
import com.allpurposecpq.backend.domain.dto.DomainDto;
import com.allpurposecpq.backend.domain.service.DomainService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class DomainController {

    private final DomainService domainService;

    public DomainController(DomainService domainService) {
        this.domainService = domainService;
    }

    @GetMapping("/domains")
    public List<DomainDto> getDomains() {
        return domainService.getAllDomains();
    }

    @GetMapping("/domains/{id}")
    public DomainDto getDomain(@PathVariable long id) {
        return domainService.getDomain(id);
    }

    @GetMapping("/domains/{domainId}/config")
    public List<ConfigItemDto> getConfig(@PathVariable long domainId) {
        return domainService.getConfigForDomain(domainId);
    }
}
