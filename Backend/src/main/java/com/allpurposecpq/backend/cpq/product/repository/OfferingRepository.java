package com.allpurposecpq.backend.cpq.product.repository;

import com.allpurposecpq.backend.cpq.product.dto.OfferingDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.util.List;
import java.util.Optional;

@Repository
public class OfferingRepository {

    private final JdbcTemplate jdbcTemplate;

    public OfferingRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<OfferingDto> findAllActive() {
        String sql = """
                SELECT ID, DOMAIN_ID, NAME, RID, "PRECISION",
                       CATIGORY, SUB_CATIGORY, DESCRIPTION,
                       DETAIL, HELP, NOTE, FML, WRD_ID,
                       SORT_ORDER, START_DATE, END_DATE
                FROM OFFERING
                WHERE DELETED_DATE IS NULL
                  AND (START_DATE IS NULL OR START_DATE <= SYSTIMESTAMP)
                  AND (END_DATE IS NULL OR END_DATE >= SYSTIMESTAMP)
                ORDER BY SORT_ORDER, NAME
                """;
        return jdbcTemplate.query(sql, this::mapOffering);
    }

    public Optional<OfferingDto> findById(long id) {
        String sql = """
                SELECT ID, DOMAIN_ID, NAME, RID, "PRECISION",
                       CATIGORY, SUB_CATIGORY, DESCRIPTION,
                       DETAIL, HELP, NOTE, FML, WRD_ID,
                       SORT_ORDER, START_DATE, END_DATE
                FROM OFFERING
                WHERE ID = ? AND DELETED_DATE IS NULL
                """;
        return jdbcTemplate.query(sql, this::mapOffering, id).stream().findFirst();
    }

    public long insert(OfferingDto dto) {
        String sql = """
                INSERT INTO OFFERING (DOMAIN_ID, NAME, RID, "PRECISION",
                                      CATIGORY, SUB_CATIGORY, DESCRIPTION,
                                      DETAIL, HELP, NOTE, FML, WRD_ID,
                                      SORT_ORDER, START_DATE, END_DATE,
                                      MODIFIED_BY)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'SYS')
                """;
        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, new String[]{"ID"});
            ps.setObject(1, dto.getDomainId());
            ps.setString(2, dto.getName());
            ps.setObject(3, dto.getRid());
            ps.setObject(4, dto.getPrecision());
            ps.setString(5, dto.getCategory());
            ps.setString(6, dto.getSubCategory());
            ps.setString(7, dto.getDescription());
            ps.setString(8, dto.getDetail());
            ps.setString(9, dto.getHelp());
            ps.setString(10, dto.getNote());
            ps.setString(11, dto.getFormula());
            ps.setObject(12, dto.getWrdId());
            ps.setObject(13, dto.getSortOrder());
            ps.setObject(14, dto.getStartDate() != null
                    ? Timestamp.from(dto.getStartDate().toInstant()) : null);
            ps.setObject(15, dto.getEndDate() != null
                    ? Timestamp.from(dto.getEndDate().toInstant()) : null);
            return ps;
        }, keyHolder);
        return keyHolder.getKey().longValue();
    }

    public int update(long id, OfferingDto dto) {
        String sql = """
                UPDATE OFFERING SET
                    NAME = ?, RID = ?, "PRECISION" = ?,
                    CATIGORY = ?, SUB_CATIGORY = ?, DESCRIPTION = ?,
                    DETAIL = ?, HELP = ?, NOTE = ?, FML = ?,
                    WRD_ID = ?, SORT_ORDER = ?, START_DATE = ?, END_DATE = ?,
                    MODIFIED_BY = 'SYS'
                WHERE ID = ? AND DELETED_DATE IS NULL
                """;
        return jdbcTemplate.update(sql,
                dto.getName(), dto.getRid(), dto.getPrecision(),
                dto.getCategory(), dto.getSubCategory(), dto.getDescription(),
                dto.getDetail(), dto.getHelp(), dto.getNote(), dto.getFormula(),
                dto.getWrdId(), dto.getSortOrder(),
                dto.getStartDate() != null ? Timestamp.from(dto.getStartDate().toInstant()) : null,
                dto.getEndDate() != null ? Timestamp.from(dto.getEndDate().toInstant()) : null,
                id);
    }

    public int softDelete(long id) {
        String sql = """
                UPDATE OFFERING SET DELETED_DATE = SYSTIMESTAMP, MODIFIED_BY = 'SYS'
                WHERE ID = ? AND DELETED_DATE IS NULL
                """;
        return jdbcTemplate.update(sql, id);
    }

    private OfferingDto mapOffering(ResultSet rs, int rowNum) throws SQLException {
        OfferingDto dto = new OfferingDto();
        dto.setId(rs.getLong("ID"));
        dto.setDomainId(rs.getLong("DOMAIN_ID"));
        dto.setName(rs.getString("NAME"));
        dto.setRid(rs.getObject("RID") != null
                ? rs.getObject("RID", BigDecimal.class).longValue() : null);
        dto.setPrecision(rs.getObject("PRECISION") != null
                ? rs.getObject("PRECISION", BigDecimal.class).intValue() : null);
        dto.setCategory(rs.getString("CATIGORY"));
        dto.setSubCategory(rs.getString("SUB_CATIGORY"));
        dto.setDescription(rs.getString("DESCRIPTION"));
        dto.setDetail(rs.getString("DETAIL"));
        dto.setHelp(rs.getString("HELP"));
        dto.setNote(rs.getString("NOTE"));
        dto.setFormula(rs.getString("FML"));
        dto.setWrdId(rs.getObject("WRD_ID") != null
                ? rs.getObject("WRD_ID", BigDecimal.class).longValue() : null);
        dto.setSortOrder(rs.getObject("SORT_ORDER") != null
                ? rs.getObject("SORT_ORDER", BigDecimal.class).intValue() : null);
        dto.setStartDate(toOffsetDateTime(rs.getObject("START_DATE")));
        dto.setEndDate(toOffsetDateTime(rs.getObject("END_DATE")));
        return dto;
    }

    private OffsetDateTime toOffsetDateTime(Object value) {
        if (value == null) return null;
        if (value instanceof Timestamp ts) return ts.toInstant().atOffset(ZoneOffset.UTC);
        return null;
    }
}
