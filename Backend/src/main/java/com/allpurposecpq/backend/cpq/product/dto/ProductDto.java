package com.allpurposecpq.backend.cpq.product.dto;

import java.time.OffsetDateTime;

public class ProductDto {
    private Long id;
    private Long domainId;
    private String name;
    private Long rid;
    private Integer precision;
    private String category;
    private String subCategory;
    private String description;
    private String detail;
    private String help;
    private String noteAdmin;
    private String formula;
    private Long wid;
    private Integer sortOrder;
    private OffsetDateTime startDate;
    private OffsetDateTime stopDate;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getDomainId() { return domainId; }
    public void setDomainId(Long domainId) { this.domainId = domainId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Long getRid() { return rid; }
    public void setRid(Long rid) { this.rid = rid; }

    public Integer getPrecision() { return precision; }
    public void setPrecision(Integer precision) { this.precision = precision; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getSubCategory() { return subCategory; }
    public void setSubCategory(String subCategory) { this.subCategory = subCategory; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDetail() { return detail; }
    public void setDetail(String detail) { this.detail = detail; }

    public String getHelp() { return help; }
    public void setHelp(String help) { this.help = help; }

    public String getNoteAdmin() { return noteAdmin; }
    public void setNoteAdmin(String noteAdmin) { this.noteAdmin = noteAdmin; }

    public String getFormula() { return formula; }
    public void setFormula(String formula) { this.formula = formula; }

    public Long getWid() { return wid; }
    public void setWid(Long wid) { this.wid = wid; }

    public Integer getSortOrder() { return sortOrder; }
    public void setSortOrder(Integer sortOrder) { this.sortOrder = sortOrder; }

    public OffsetDateTime getStartDate() { return startDate; }
    public void setStartDate(OffsetDateTime startDate) { this.startDate = startDate; }

    public OffsetDateTime getStopDate() { return stopDate; }
    public void setStopDate(OffsetDateTime stopDate) { this.stopDate = stopDate; }
}
