package com.allpurposecpq.backend.cpq.appconfig.repository;

import com.allpurposecpq.backend.cpq.appconfig.model.AppConfig;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AppConfigRepository extends JpaRepository<AppConfig, Long> {

    // GET all active configs for a domain
    List<AppConfig> findByDomainIdAndStopDateIsNull(Long domainId);

    // GET all active configs for a domain filtered by group
    List<AppConfig> findByDomainIdAndGrpAndStopDateIsNull(Long domainId, String grp);

    // GET single active config by id
    Optional<AppConfig> findByIdAndStopDateIsNull(Long id);
}
