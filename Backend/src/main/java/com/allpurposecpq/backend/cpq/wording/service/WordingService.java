package com.allpurposecpq.backend.cpq.wording.service;

import com.allpurposecpq.backend.cpq.wording.model.Wording;
import com.allpurposecpq.backend.cpq.wording.repository.WordingRepository;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class WordingService {

    private final WordingRepository wordingRepository;

    public WordingService(WordingRepository wordingRepository) {
        this.wordingRepository = wordingRepository;
    }

    public List<Wording> getActiveWordingsByTable(String tableName) {
        return wordingRepository.findByTableNameAndStopDateIsNullOrderBySortOrderAsc(tableName);
    }

    public List<Wording> getActiveWordingsByRecord(String tableName, Long recordId) {
        return wordingRepository
                .findByTableNameAndRecordIdAndStopDateIsNullOrderBySortOrderAsc(tableName, recordId);
    }

    public Optional<Wording> getActiveWordingById(Long id) {
        return wordingRepository.findByIdAndStopDateIsNull(id);
    }

    public Wording createWording(Wording wording) {
        wording.setId(null);
        wording.setModifiedDate(OffsetDateTime.now());
        return wordingRepository.save(wording);
    }

    public Optional<Wording> updateWording(Long id, Wording incoming) {
        return wordingRepository.findByIdAndStopDateIsNull(id).map(existing -> {
            existing.setParentId(incoming.getParentId());
            existing.setTableName(incoming.getTableName());
            existing.setRecordId(incoming.getRecordId());
            existing.setSummaryText(incoming.getSummaryText());
            existing.setFullText(incoming.getFullText());
            existing.setTextFilename(incoming.getTextFilename());
            existing.setDocFilename(incoming.getDocFilename());
            existing.setImageFilenames(incoming.getImageFilenames());
            existing.setVersion(incoming.getVersion());
            existing.setSortOrder(incoming.getSortOrder());
            existing.setStartDate(incoming.getStartDate());
            existing.setStopDate(incoming.getStopDate());
            existing.setModifiedBy(incoming.getModifiedBy());
            existing.setModifiedDate(OffsetDateTime.now());
            return wordingRepository.save(existing);
        });
    }

    public Optional<Wording> deactivateWording(Long id) {
        return wordingRepository.findByIdAndStopDateIsNull(id).map(existing -> {
            existing.setStopDate(OffsetDateTime.now());
            existing.setModifiedDate(OffsetDateTime.now());
            return wordingRepository.save(existing);
        });
    }
}
