package com.allpurposecpq.backend.user.model;

import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

@Table("AU_USER_ROLE_XR")
public class AuUserRoleXr {

    @Column("USER_ID")
    private Long userId;

    @Column("ROLE_ID")
    private Long roleId;

    public AuUserRoleXr(Long userId, Long roleId) {
        super();
        this.userId = userId;
    }

    public AuUserRoleXr() {
        super();
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public Long getUserId() {
        return userId;
    }

    public Long getRoleId() {
        return roleId;
    }
}
