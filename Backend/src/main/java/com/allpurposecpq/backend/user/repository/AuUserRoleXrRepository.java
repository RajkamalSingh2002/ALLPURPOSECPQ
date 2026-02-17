package com.allpurposecpq.backend.user.repository;

import com.allpurposecpq.backend.user.model.AuUserRoleXr;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface AuUserRoleXrRepository extends CrudRepository<AuUserRoleXr, Long> {

    List<AuUserRoleXr> findByUserId(Long userId);
}

