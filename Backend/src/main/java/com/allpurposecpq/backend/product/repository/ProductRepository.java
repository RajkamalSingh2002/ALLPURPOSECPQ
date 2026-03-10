package com.allpurposecpq.backend.product.repository;

import com.allpurposecpq.backend.product.dto.ProductDto;
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
public class ProductRepository {

    private final JdbcTemplate jdbcTemplate;

    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<ProductDto> findAllActive() {
        String sql = """
                SELECT ID, DOMAIN_ID, NAME, RID, "PRECISION",
                       CATIGORY, SUB_CATEGORY, DESCRIPTION,
                       DETAIL, HELP, NOTE_ADMIN, FML, WID,
                       SORT_ORDER, START_DATE, STOP_DATE
                FROM PRODUCT
                WHERE (START_DATE IS NULL OR START_DATE <= SYSTIMESTAMP)
                  AND (STOP_DATE IS NULL OR STOP_DATE >= SYSTIMESTAMP)
                ORDER BY SORT_ORDER, NAME
                """;
        return jdbcTemplate.query(sql, this::mapProduct);
    }

    public Optional<ProductDto> findById(long id) {
        String sql = """
                SELECT ID, DOMAIN_ID, NAME, RID, "PRECISION",
                       CATIGORY, SUB_CATEGORY, DESCRIPTION,
                       DETAIL, HELP, NOTE_ADMIN, FML, WID,
                       SORT_ORDER, START_DATE, STOP_DATE
                FROM PRODUCT
                WHERE ID = ?
                """;
        return jdbcTemplate.query(sql, this::mapProduct, id).stream().findFirst();
    }

    public long insert(ProductDto dto) {
        String sql = """
                INSERT INTO PRODUCT (DOMAIN_ID, NAME, RID, "PRECISION",
                                     CATIGORY, SUB_CATEGORY, DESCRIPTION,
                                     DETAIL, HELP, NOTE_ADMIN, FML, WID,
                                     SORT_ORDER, START_DATE, STOP_DATE, MODIFIED_BY)
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
            ps.setString(10, dto.getNoteAdmin());
            ps.setString(11, dto.getFormula());
            ps.setObject(12, dto.getWid());
            ps.setObject(13, dto.getSortOrder());
            ps.setObject(14, dto.getStartDate() != null
                    ? Timestamp.from(dto.getStartDate().toInstant()) : null);
            ps.setObject(15, dto.getStopDate() != null
                    ? Timestamp.from(dto.getStopDate().toInstant()) : null);
            return ps;
        }, keyHolder);
        return keyHolder.getKey().longValue();
    }

    public int update(long id, ProductDto dto) {
        String sql = """
                UPDATE PRODUCT SET
                    NAME = ?, RID = ?, "PRECISION" = ?,
                    CATIGORY = ?, SUB_CATEGORY = ?, DESCRIPTION = ?,
                    DETAIL = ?, HELP = ?, NOTE_ADMIN = ?, FML = ?,
                    WID = ?, SORT_ORDER = ?, START_DATE = ?, STOP_DATE = ?,
                    MODIFIED_BY = 'SYS'
                WHERE ID = ?
                """;
        return jdbcTemplate.update(sql,
                dto.getName(), dto.getRid(), dto.getPrecision(),
                dto.getCategory(), dto.getSubCategory(), dto.getDescription(),
                dto.getDetail(), dto.getHelp(), dto.getNoteAdmin(), dto.getFormula(),
                dto.getWid(), dto.getSortOrder(),
                dto.getStartDate() != null ? Timestamp.from(dto.getStartDate().toInstant()) : null,
                dto.getStopDate() != null ? Timestamp.from(dto.getStopDate().toInstant()) : null,
                id);
    }

    public int softDelete(long id) {
        // PRODUCT has no DELETED_DATE — use STOP_DATE to expire it
        String sql = """
                UPDATE PRODUCT SET STOP_DATE = SYSTIMESTAMP, MODIFIED_BY = 'SYS'
                WHERE ID = ?
                """;
        return jdbcTemplate.update(sql, id);
    }

    private ProductDto mapProduct(ResultSet rs, int rowNum) throws SQLException {
        ProductDto dto = new ProductDto();
        dto.setId(rs.getLong("ID"));
        dto.setDomainId(rs.getLong("DOMAIN_ID"));
        dto.setName(rs.getString("NAME"));
        dto.setRid(rs.getObject("RID") != null
                ? rs.getObject("RID", BigDecimal.class).longValue() : null);
        dto.setPrecision(rs.getObject("PRECISION") != null
                ? rs.getObject("PRECISION", BigDecimal.class).intValue() : null);
        dto.setCategory(rs.getString("CATIGORY"));
        dto.setSubCategory(rs.getString("SUB_CATEGORY"));
        dto.setDescription(rs.getString("DESCRIPTION"));
        dto.setDetail(rs.getString("DETAIL"));
        dto.setHelp(rs.getString("HELP"));
        dto.setNoteAdmin(rs.getString("NOTE_ADMIN"));
        dto.setFormula(rs.getString("FML"));
        dto.setWid(rs.getObject("WID") != null
                ? rs.getObject("WID", BigDecimal.class).longValue() : null);
        dto.setSortOrder(rs.getObject("SORT_ORDER") != null
                ? rs.getObject("SORT_ORDER", BigDecimal.class).intValue() : null);
        dto.setStartDate(toOffsetDateTime(rs.getObject("START_DATE")));
        dto.setStopDate(toOffsetDateTime(rs.getObject("STOP_DATE")));
        return dto;
    }

    private OffsetDateTime toOffsetDateTime(Object value) {
        if (value == null) return null;
        if (value instanceof Timestamp ts) return ts.toInstant().atOffset(ZoneOffset.UTC);
        return null;
    }
}
