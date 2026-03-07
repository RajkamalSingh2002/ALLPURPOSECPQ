package com.allpurposecpq.backend.cpq.wording.repository;

import com.allpurposecpq.backend.cpq.wording.model.Wording;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface WordingRepository extends JpaRepository<Wording, Long> {

    // Get all active wordings by tableName (e.g. "PRODUCT", "ITEM", "RATE")
    List<Wording> findByTableNameAndStopDateIsNullOrderBySortOrderAsc(String tableName);

    // Get all active wordings linked to a specific record
    List<Wording> findByTableNameAndRecordIdAndStopDateIsNullOrderBySortOrderAsc(
            String tableName, Long recordId
    );

    Optional<Wording> findByIdAndStopDateIsNull(Long id);
}
