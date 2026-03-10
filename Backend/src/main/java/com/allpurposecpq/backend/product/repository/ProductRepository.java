package com.allpurposecpq.backend.product.repository;

import com.allpurposecpq.backend.product.dto.ProductDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
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
                SELECT ID, DOMAIN_ID, NAME, DESCRIPTION, PRECISION,
                       DETAIL, HELP, NOTE, FML,
                       START_DATE, END_DATE, DELETED_DATE
                FROM PRODUCT
                WHERE DELETED_DATE IS NULL
                  AND (START_DATE IS NULL OR START_DATE <= SYSTIMESTAMP)
                  AND (END_DATE IS NULL OR END_DATE >= SYSTIMESTAMP)
                ORDER BY NAME
                """;
        return jdbcTemplate.query(sql, this::mapProduct);
    }

    public Optional<ProductDto> findById(long id) {
        String sql = """
                SELECT ID, DOMAIN_ID, NAME, DESCRIPTION, PRECISION,
                       DETAIL, HELP, NOTE, FML,
                       START_DATE, END_DATE, DELETED_DATE
                FROM PRODUCT
                WHERE ID = ?
                """;
        return jdbcTemplate.query(sql, this::mapProduct, id)
                .stream().findFirst();
    }

    private ProductDto mapProduct(ResultSet rs, int rowNum) throws SQLException {
        ProductDto dto = new ProductDto();
        dto.setId(rs.getLong("ID"));
        dto.setDomainId(rs.getLong("DOMAIN_ID"));
        dto.setName(rs.getString("NAME"));
        dto.setDescription(rs.getString("DESCRIPTION"));
        dto.setPrecision(rs.getObject("PRECISION") != null
                ? rs.getObject("PRECISION", java.math.BigDecimal.class).intValue()
                : null);
        dto.setDetail(rs.getString("DETAIL"));
        dto.setHelp(rs.getString("HELP"));
        dto.setNote(rs.getString("NOTE"));
        dto.setFormula(rs.getString("FML"));
        dto.setStartDate(toOffsetDateTime(rs.getObject("START_DATE")));
        dto.setEndDate(toOffsetDateTime(rs.getObject("END_DATE")));
        return dto;
    }

    private OffsetDateTime toOffsetDateTime(Object value) {
        if (value == null) return null;
        if (value instanceof java.sql.Timestamp ts) {
            return ts.toInstant().atOffset(ZoneOffset.UTC);
        }
        return null;
    }
}
