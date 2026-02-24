package com.allpurposecpq.backend.cpq.appconfig.service;

import com.allpurposecpq.backend.cpq.appconfig.model.AppConfig;
import com.allpurposecpq.backend.cpq.appconfig.repository.AppConfigRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AppConfigService {

    private final AppConfigRepository appConfigRepository;

    public AppConfigService(AppConfigRepository appConfigRepository) {
        this.appConfigRepository = appConfigRepository;
    }

    // GET all active configs for a domain
    public List<AppConfig> getActiveConfigs(Long domainId) {
        return appConfigRepository.findByDomainIdAndStopDateIsNull(domainId);
    }

    // GET active configs for a domain filtered by group
    public List<AppConfig> getActiveConfigsByGroup(Long domainId, String grp) {
        return appConfigRepository.findByDomainIdAndGrpAndStopDateIsNull(domainId, grp);
    }

    // GET single active config by id
    public Optional<AppConfig> getActiveConfigById(Long id) {
        return appConfigRepository.findByIdAndStopDateIsNull(id);
    }

    // POST - create new config
    public AppConfig createConfig(AppConfig config) {
        config.setId(null);
        config.setStopDate(null);
        config.setStartDate(OffsetDateTime.now());
        return appConfigRepository.save(config);
    }

    // PUT - update existing active config
    public Optional<AppConfig> updateConfig(Long id, AppConfig updated) {
        return appConfigRepository.findByIdAndStopDateIsNull(id).map(existing -> {
            existing.setDomainId(updated.getDomainId());
            existing.setGrp(updated.getGrp());
            existing.setName(updated.getName());
            existing.setValue(updated.getValue());
            existing.setDescription(updated.getDescription());
            existing.setDetail(updated.getDetail());
            existing.setHelp(updated.getHelp());
            existing.setNoteAdmin(updated.getNoteAdmin());
            existing.setCssFile(updated.getCssFile());
            existing.setDateValue(updated.getDateValue());
            return appConfigRepository.save(existing);
        });
    }

    // PUT - deactivate (soft delete via stopDate)
    public Optional<AppConfig> deactivateConfig(Long id) {
        return appConfigRepository.findByIdAndStopDateIsNull(id).map(existing -> {
            existing.setStopDate(OffsetDateTime.now());
            return appConfigRepository.save(existing);
        });
    }
}
