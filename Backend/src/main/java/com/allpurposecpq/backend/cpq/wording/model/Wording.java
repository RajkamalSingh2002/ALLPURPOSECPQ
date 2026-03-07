package com.allpurposecpq.backend.cpq.wording.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "WORDING")
public class Wording {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "wording_seq")
    @SequenceGenerator(name = "wording_seq", sequenceName = "PK_WORDING", allocationSize = 1)
    @Column(name = "ID")
    private Long id;

    @Column(name = "PARENT_ID")
    private Long parentId;

    @Column(name = "TABLE_NAME")
    private String tableName;

    @Column(name = "RECORD_ID")
    private Long recordId;

    @Column(name = "SUMMARY_TEXT")
    private String summaryText;

    @Column(name = "FULL_TEXT")
    private String fullText;

    @Column(name = "TEXT_FILENAME")
    private String textFilename;

    @Column(name = "DOC_FILENAME")
    private String docFilename;

    @Column(name = "IMAGE_FILENAMES")
    private String imageFilenames;

    @Column(name = "VERSION")
    private Long version;

    @Column(name = "SORT_ORDER")
    private Long sortOrder;

    @Column(name = "MODIFIED_BY")
    private String modifiedBy;

    @Column(name = "MODIFIED_DATE")
    private OffsetDateTime modifiedDate;

    @Column(name = "START_DATE")
    private OffsetDateTime startDate;

    @Column(name = "STOP_DATE")
    private OffsetDateTime stopDate;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getParentId() { return parentId; }
    public void setParentId(Long parentId) { this.parentId = parentId; }

    public String getTableName() { return tableName; }
    public void setTableName(String tableName) { this.tableName = tableName; }

    public Long getRecordId() { return recordId; }
    public void setRecordId(Long recordId) { this.recordId = recordId; }

    public String getSummaryText() { return summaryText; }
    public void setSummaryText(String summaryText) { this.summaryText = summaryText; }

    public String getFullText() { return fullText; }
    public void setFullText(String fullText) { this.fullText = fullText; }

    public String getTextFilename() { return textFilename; }
    public void setTextFilename(String textFilename) { this.textFilename = textFilename; }

    public String getDocFilename() { return docFilename; }
    public void setDocFilename(String docFilename) { this.docFilename = docFilename; }

    public String getImageFilenames() { return imageFilenames; }
    public void setImageFilenames(String imageFilenames) { this.imageFilenames = imageFilenames; }

    public Long getVersion() { return version; }
    public void setVersion(Long version) { this.version = version; }

    public Long getSortOrder() { return sortOrder; }
    public void setSortOrder(Long sortOrder) { this.sortOrder = sortOrder; }

    public String getModifiedBy() { return modifiedBy; }
    public void setModifiedBy(String modifiedBy) { this.modifiedBy = modifiedBy; }

    public OffsetDateTime getModifiedDate() { return modifiedDate; }
    public void setModifiedDate(OffsetDateTime modifiedDate) { this.modifiedDate = modifiedDate; }

    public OffsetDateTime getStartDate() { return startDate; }
    public void setStartDate(OffsetDateTime startDate) { this.startDate = startDate; }

    public OffsetDateTime getStopDate() { return stopDate; }
    public void setStopDate(OffsetDateTime stopDate) { this.stopDate = stopDate; }
}
