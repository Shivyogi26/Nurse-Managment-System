package com.hospital.scheduling.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "audit_log")
public class AuditLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String action;

    private String entityType;

    private Long entityId;

    private LocalDateTime timestamp;

    public AuditLog() {
    }

    public AuditLog(String action, String entityType, Long entityId) {
        this.action = action;
        this.entityType = entityType;
        this.entityId = entityId;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getAction() {
        return action;
    }

    public String getEntityType() {
        return entityType;
    }

    public Long getEntityId() {
        return entityId;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}
