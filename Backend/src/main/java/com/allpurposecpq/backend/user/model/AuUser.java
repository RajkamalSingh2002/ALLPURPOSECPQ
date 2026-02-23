package com.allpurposecpq.backend.user.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.List;

@Entity
@Table(name = "AU_USER")
public class AuUser {

    @Id
    @Column(name = "ID")
    private Long id;

    @Column(name = "DOMAIN_ID")
    private Long domainId;

    @Column(name = "CONTACT_ID")
    private Long contactId;

    @Column(name = "USERNAME")
    private String username;

    @Column(name = "PASSWORD_HASH")
    private String passwordHash;

    @Column(name = "ENABLED")
    private Integer enabled;

    @Column(name = "FULL_NAME")
    private String fullName;

    @Column(name = "MODIFIED_BY")
    private String modifiedBy;

    @Column(name = "MODIFIED_DATE")
    private OffsetDateTime modifiedDate;

    // ✅ REPLACES AuUserRoleXr entirely — JPA handles the join table
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "AU_USER_ROLE_XR",
            joinColumns = @JoinColumn(name = "USER_ID"),
            inverseJoinColumns = @JoinColumn(name = "ROLE_ID")
    )
    private List<AuRole> roles;

    public AuUser() {}

    public Long getId() { return id; }
    public Long getDomainId() { return domainId; }
    public Long getContactId() { return contactId; }
    public String getUsername() { return username; }
    public String getPasswordHash() { return passwordHash; }
    public Integer getEnabled() { return enabled; }
    public String getFullName() { return fullName; }
    public String getModifiedBy() { return modifiedBy; }
    public OffsetDateTime getModifiedDate() { return modifiedDate; }
    public List<AuRole> getRoles() { return roles; }

    public void setId(Long id) { this.id = id; }
    public void setDomainId(Long domainId) { this.domainId = domainId; }
    public void setContactId(Long contactId) { this.contactId = contactId; }
    public void setUsername(String username) { this.username = username; }
    public void setPasswordHash(String passwordHash) { this.passwordHash = passwordHash; }
    public void setEnabled(Integer enabled) { this.enabled = enabled; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setModifiedBy(String modifiedBy) { this.modifiedBy = modifiedBy; }
    public void setModifiedDate(OffsetDateTime modifiedDate) { this.modifiedDate = modifiedDate; }
    public void setRoles(List<AuRole> roles) { this.roles = roles; }
}
