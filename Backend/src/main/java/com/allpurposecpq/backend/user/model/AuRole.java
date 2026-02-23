package com.allpurposecpq.backend.user.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "AU_ROLE")
public class AuRole {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "ACCESS_LEVEL")
    private Integer accessLevel;

    @Column(name = "NAME")
    private String name;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "MODIFIED_BY")
    private String modifiedBy;

    @Column(name = "MODIFIED_DATE")
    private OffsetDateTime modifiedDate;

    public AuRole() {}

    public Long getId() { return id; }
    public Integer getAccessLevel() { return accessLevel; }
    public String getName() { return name; }
    public String getDescription() { return description; }
    public String getModifiedBy() { return modifiedBy; }
    public OffsetDateTime getModifiedDate() { return modifiedDate; }

    public void setId(Long id) { this.id = id; }
    public void setAccessLevel(Integer accessLevel) { this.accessLevel = accessLevel; }
    public void setName(String name) { this.name = name; }
    public void setDescription(String description) { this.description = description; }
    public void setModifiedBy(String modifiedBy) { this.modifiedBy = modifiedBy; }
    public void setModifiedDate(OffsetDateTime modifiedDate) { this.modifiedDate = modifiedDate; }
}
