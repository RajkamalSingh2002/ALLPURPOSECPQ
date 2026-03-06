package com.allpurposecpq.backend.cpq.appconfig.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "CONFIG")
public class AppConfig {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "config_seq")
    @SequenceGenerator(name = "config_seq", sequenceName = "PK_CONFIG", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "DOMAIN_ID")
    private Long domainId;

    @Column(name = "GRP")
    private String grp;

    @Column(name = "NAME")
    private String name;

    @Column(name = "VALUE")
    private String value;

    @Column(name = "DESCRIPTION")
    private String description;

    @Column(name = "DETAIL")
    private String detail;

    @Column(name = "HELP")
    private String help;

    @Column(name = "NOTE_ADMIN")
    private String noteAdmin;

    @Column(name = "START_DATE")
    private OffsetDateTime startDate;

    @Column(name = "STOP_DATE")
    private OffsetDateTime stopDate;

    @Column(name = "CSS_FILE")
    private String cssFile;

    @Column(name = "DATE_VALUE")
    private OffsetDateTime dateValue;

    @Column(name = "MODIFIED_BY")
    private String modifiedBy;

    @Column(name = "MODIFIED_DATE")
    private OffsetDateTime modifiedDate;


    // --- Getters and Setters ---

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getDomainId() { return domainId; }
    public void setDomainId(Long domainId) { this.domainId = domainId; }

    public String getGrp() { return grp; }
    public void setGrp(String grp) { this.grp = grp; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getValue() { return value; }
    public void setValue(String value) { this.value = value; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDetail() { return detail; }
    public void setDetail(String detail) { this.detail = detail; }

    public String getHelp() { return help; }
    public void setHelp(String help) { this.help = help; }

    public String getNoteAdmin() { return noteAdmin; }
    public void setNoteAdmin(String noteAdmin) { this.noteAdmin = noteAdmin; }

    public OffsetDateTime getStartDate() { return startDate; }
    public void setStartDate(OffsetDateTime startDate) { this.startDate = startDate; }

    public OffsetDateTime getStopDate() { return stopDate; }
    public void setStopDate(OffsetDateTime stopDate) { this.stopDate = stopDate; }

    public String getCssFile() { return cssFile; }
    public void setCssFile(String cssFile) { this.cssFile = cssFile; }

    public OffsetDateTime getDateValue() { return dateValue; }
    public void setDateValue(OffsetDateTime dateValue) { this.dateValue = dateValue; }

    public String getModifiedBy() { return modifiedBy; }
    public void setModifiedBy(String modifiedBy) { this.modifiedBy = modifiedBy; }

    public OffsetDateTime getModifiedDate() { return modifiedDate; }
    public void setModifiedDate(OffsetDateTime modifiedDate) { this.modifiedDate = modifiedDate; }

}
