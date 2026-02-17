package com.allpurposecpq.backend.user.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

import java.time.OffsetDateTime;

@Table("AU_ROLE")
public class AuRole {

    @Id
    @Column("ID")
    private Long id;

    @Column("ACCESS_LEVEL")
    private Integer accessLevel;

    @Column("NAME")
    private String name;

    @Column("DESCRIPTION")
    private String description;

    @Column("MODIFIED_BY")
    private String modifiedBy;

    @Column("MODIFIED_DATE")
    private OffsetDateTime modifiedDate;

    public void setAccessLevel(Integer accessLevel) {
        this.accessLevel = accessLevel;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Integer getAccessLevel() {
        return accessLevel;
    }

    public String getName() {
        return name;
    }

    public String getDescription() {
        return description;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public OffsetDateTime getModifiedDate() {
        return modifiedDate;
    }
}
