package com.allpurposecpq.backend.user.repository;

import com.allpurposecpq.backend.user.model.AuRole;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface AuRoleRepository extends JpaRepository<AuRole, Long> {

    List<AuRole> findByIdIn(Collection<Long> ids);
}
