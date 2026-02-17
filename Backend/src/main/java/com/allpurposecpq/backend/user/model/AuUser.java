package com.allpurposecpq.backend.user.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

import java.time.OffsetDateTime;

@Table("AU_USER")
public class AuUser {

    @Id
    @Column("ID")
    private Long id;

    @Column("DOMAIN_ID")
    private Long domainId;

    @Column("CONTACT_ID")
    private Long contactId;

    @Column("USERNAME")
    private String username;

    @Column("PASSWORD_HASH")
    private String passwordHash;

    @Column("ENABLED")
    private Integer enabled;

    @Column("FULL_NAME")
    private String fullName;

    @Column("MODIFIED_BY")
    private String modifiedBy;

    @Column("MODIFIED_DATE")
    private OffsetDateTime modifiedDate;

    public void setDomainId(Long domainId) {
        this.domainId = domainId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setContactId(Long contactId) {
        this.contactId = contactId;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public void setEnabled(Integer enabled) {
        this.enabled = enabled;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public void setModifiedBy(String modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public void setModifiedDate(OffsetDateTime modifiedDate) {
        this.modifiedDate = modifiedDate;
    }
    public AuUser() {
        super();
    }

    public Long getDomainId() {
        return domainId;
    }

    public Long getId() {
        return id;
    }

    public Long getContactId() {
        return contactId;
    }

    public String getUsername() {
        return username;
    }

    public String getPasswordHash() {
        return passwordHash;
    }

    public Integer getEnabled() {
        return enabled;
    }

    public String getFullName() {
        return fullName;
    }

    public String getModifiedBy() {
        return modifiedBy;
    }

    public OffsetDateTime getModifiedDate() {
        return modifiedDate;
    }
}
