package com.hospital.scheduling.service;

import com.hospital.scheduling.entity.AuditLog;
import com.hospital.scheduling.repository.AuditLogRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuditService {

    @Autowired
    private AuditLogRepository auditLogRepository;

    public void log(String action, String entityType, Long entityId) {
        AuditLog log = new AuditLog(action, entityType, entityId);
        auditLogRepository.save(log);
    }
}
