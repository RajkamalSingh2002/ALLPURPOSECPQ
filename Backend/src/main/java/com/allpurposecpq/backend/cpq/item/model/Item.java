package com.allpurposecpq.backend.cpq.item.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "ITEM")
public class Item {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "item_seq")
    @SequenceGenerator(name = "item_seq", sequenceName = "ITEM_SEQ", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "DOMAIN_ID")
    private Long domainId;

    @Column(name = "TYPE")
    private String type;

    @Column(name = "PAGE_NUM")
    private Integer pageNum;

    @Column(name = "SORT_ORDER")
    private Integer sortOrder;

    @Column(name = "SORT_PARENT")
    private Integer sortParent;

    @Column(name = "CODE")
    private String code;

    @Column(name = "USER_LABEL")
    private String userLabel;

    @Column(name = "DEFAULT_VALUE_CSV")
    private String defaultValueCsv;

    @Column(name = "PARENT_ID")
    private Long parentId;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "DETAIL")
    private String details;

    @Column(name = "HELP")
    private String help;

    @Column(name = "WID")
    private Long wid;

    @Column(name = "INPUT_VAL")
    private Integer inputVal;

    @Column(name = "FIELD_SIZING")
    private String fieldSizing;

    @Column(name = "FIELD_CONSTRAINT")
    private String fieldConstraint;

    @Column(name = "FIELD_ATTRIBUTES")
    private String fieldAttributes;

    @Column(name = "ACTIVE_WHEN")
    private String activeWhen;

    @Column(name = "IMAGE")
    private String image;

    @Column(name = "NOTE_ADMIN")
    private String noteAdmin;

    @Column(name = "START_DATE")
    private OffsetDateTime startDate;

    @Column(name = "STOP_DATE")
    private OffsetDateTime stopDate;

    // ---- Getters and Setters ----

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getDomainId() { return domainId; }
    public void setDomainId(Long domainId) { this.domainId = domainId; }

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public Integer getPageNum() { return pageNum; }
    public void setPageNum(Integer pageNum) { this.pageNum = pageNum; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public Integer getSortParent() { return sortParent; }
    public void setSortParent(Integer sortParent) { this.sortParent = sortParent; }

    public String getCode() { return code; }
    public void setCode(String code) { this.code = code; }

    public String getUserLabel() { return userLabel; }
    public void setUserLabel(String userLabel) { this.userLabel = userLabel; }

    public String getDefaultValueCsv() { return defaultValueCsv; }
    public void setDefaultValueCsv(String defaultValueCsv) { this.defaultValueCsv = defaultValueCsv; }

    public Long getParentId() { return parentId; }
    public void setParentId(Long parentId) { this.parentId = parentId; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDetails() { return details; }
    public void setDetails(String details) { this.details = details; }

    public String getHelp() { return help; }
    public void setHelp(String help) { this.help = help; }

    public Long getWid() { return wid; }
    public void setWid(Long wid) { this.wid = wid; }

    public Integer getInputVal() { return inputVal; }
    public void setInputVal(Integer inputVal) { this.inputVal = inputVal; }

    public String getFieldSizing() { return fieldSizing; }
    public void setFieldSizing(String fieldSizing) { this.fieldSizing = fieldSizing; }

    public String getFieldConstraint() { return fieldConstraint; }
    public void setFieldConstraint(String fieldConstraint) { this.fieldConstraint = fieldConstraint; }

    public String getFieldAttributes() { return fieldAttributes; }
    public void setFieldAttributes(String fieldAttributes) { this.fieldAttributes = fieldAttributes; }

    public String getActiveWhen() { return activeWhen; }
    public void setActiveWhen(String activeWhen) { this.activeWhen = activeWhen; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public String getNoteAdmin() { return noteAdmin; }
    public void setNoteAdmin(String noteAdmin) { this.noteAdmin = noteAdmin; }

    public OffsetDateTime getStartDate() { return startDate; }
    public void setStartDate(OffsetDateTime startDate) { this.startDate = startDate; }

    public OffsetDateTime getStopDate() { return stopDate; }
    public void setStopDate(OffsetDateTime stopDate) { this.stopDate = stopDate; }
}
