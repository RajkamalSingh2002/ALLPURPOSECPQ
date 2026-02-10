package com.allpurposecpq.backend.dto;

import java.time.OffsetDateTime;

public class ConfigItemDto {
    private Long id;
    private Long domainId;
    private String group;
    private String name;
    private String value;
    private String css;
    private String description;
    private String detail;
    private String help;
    private String noteAdmin;
    private OffsetDateTime dateValue;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getDomainId() {
        return domainId;
    }

    public void setDomainId(Long domainId) {
        this.domainId = domainId;
    }

    public String getGroup() {
        return group;
    }

    public void setGroup(String group) {
        this.group = group;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getCss() {
        return css;
    }

    public void setCss(String css) {
        this.css = css;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDetail() {
        return detail;
    }

    public void setDetail(String detail) {
        this.detail = detail;
    }

    public String getHelp() {
        return help;
    }

    public void setHelp(String help) {
        this.help = help;
    }

    public String getNoteAdmin() {
        return noteAdmin;
    }

    public void setNoteAdmin(String noteAdmin) {
        this.noteAdmin = noteAdmin;
    }

    public OffsetDateTime getDateValue() {
        return dateValue;
    }

    public void setDateValue(OffsetDateTime dateValue) {
        this.dateValue = dateValue;
    }
}
