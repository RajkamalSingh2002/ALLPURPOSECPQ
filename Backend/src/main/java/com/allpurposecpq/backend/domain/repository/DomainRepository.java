package com.allpurposecpq.backend.domain.repository;

import com.allpurposecpq.backend.cpq.appconfig.dto.ConfigItemDto;
import com.allpurposecpq.backend.domain.dto.DomainDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public class DomainRepository {

    private final JdbcTemplate jdbcTemplate;

    public DomainRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public Optional<DomainDto> findById(long id) {
        String sql = """
                SELECT ID, NAME, DESCRIPTION, ENABLED,
                       MODIFIED_BY, MODIFIED_DATE
                FROM AP_DOMAIN
                WHERE ID = ?
                """;

        List<DomainDto> results = jdbcTemplate.query(sql, this::mapDomain, id);
        return results.stream().findFirst();
    }

    public List<DomainDto> findAll() {
        String sql = """
                SELECT ID, NAME, DESCRIPTION, ENABLED,
                       MODIFIED_BY, MODIFIED_DATE
                FROM AP_DOMAIN
                ORDER BY ID
                """;

        return jdbcTemplate.query(sql, this::mapDomain);
    }

    public List<ConfigItemDto> findConfigByDomain(long domainId) {
        String sql = """
                SELECT ID, DOMAIN_ID, GRP, NAME, VALUE, CSS,
                       DESCRIPTION, DETAIL, HELP, NOTE_ADMIN, DATE_VALUE
                FROM CONFIG
                WHERE DOMAIN_ID = ?
                  AND DELETED_DATE IS NULL
                ORDER BY GRP, NAME
                """;

        return jdbcTemplate.query(sql, this::mapConfig, domainId);
    }

    private DomainDto mapDomain(ResultSet rs, int rowNum) throws SQLException {
        DomainDto dto = new DomainDto();
        dto.setId(rs.getLong("ID"));
        dto.setName(rs.getString("NAME"));
        dto.setDescription(rs.getString("DESCRIPTION"));
        dto.setEnabled(rs.getInt("ENABLED") == 1);
        dto.setModifiedBy(rs.getString("MODIFIED_BY"));
        dto.setModifiedDate(toOffsetDateTime(rs.getObject("MODIFIED_DATE")));
        return dto;
    }

    private ConfigItemDto mapConfig(ResultSet rs, int rowNum) throws SQLException {
        ConfigItemDto dto = new ConfigItemDto();
        dto.setId(rs.getLong("ID"));
        dto.setDomainId(rs.getLong("DOMAIN_ID"));
        dto.setGroup(rs.getString("GRP"));
        dto.setName(rs.getString("NAME"));
        dto.setValue(rs.getString("VALUE"));
        dto.setCss(rs.getString("CSS"));
        dto.setDescription(rs.getString("DESCRIPTION"));
        dto.setDetail(rs.getString("DETAIL"));
        dto.setHelp(rs.getString("HELP"));
        dto.setNoteAdmin(rs.getString("NOTE_ADMIN"));
        dto.setDateValue(toOffsetDateTime(rs.getObject("DATE_VALUE")));
        return dto;
    }

    private OffsetDateTime toOffsetDateTime(Object value) {
        if (value == null) {
            return null;
        }
        if (value instanceof java.sql.Timestamp ts) {
            return ts.toInstant().atOffset(OffsetDateTime.now().getOffset());
        }
        return null;
    }
}
