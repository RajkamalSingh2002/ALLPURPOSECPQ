package com.allpurposecpq.backend.user.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

@Table("AU_USER_ROLE_XR")
public class AuUserRoleXr {

// NOTE: This mapping is READ-ONLY.
// The real primary key in Oracle is (USER_ID, ROLE_ID).
// We mark USER_ID as @Id only to satisfy Spring Data JDBC.
// Do NOT use this repository for inserts/updates/deletes.

    @Id
    @Column("USER_ID")
    private Long userId;

    @Column("ROLE_ID")
    private Long roleId;

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }
}

