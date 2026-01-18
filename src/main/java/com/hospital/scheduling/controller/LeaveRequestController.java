package com.hospital.scheduling.controller;

import com.hospital.scheduling.entity.LeaveRequest;
import com.hospital.scheduling.entity.Nurse;
import com.hospital.scheduling.repository.LeaveRequestRepository;
import com.hospital.scheduling.repository.NurseRepository;
import com.hospital.scheduling.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/leaves")
public class LeaveRequestController {

    @Autowired
    private LeaveRequestRepository leaveRequestRepository;

    @Autowired
    private NurseRepository nurseRepository;

    @Autowired
    private AuditService auditService;

    // Request leave
    @PostMapping
    public LeaveRequest requestLeave(
            @RequestParam Long nurseId,
            @RequestParam String date,
            @RequestParam String reason
    ) {

        Nurse nurse = nurseRepository.findById(nurseId)
                .orElseThrow(() -> new RuntimeException("Nurse not found"));

        LeaveRequest leave = new LeaveRequest();
        leave.setNurse(nurse);
        leave.setLeaveDate(LocalDate.parse(date));
        leave.setReason(reason);
        leave.setStatus("PENDING");

        LeaveRequest savedLeave = leaveRequestRepository.save(leave);

        // ✅ Audit log (after successful leave request)
        auditService.log("REQUEST_LEAVE", "LEAVE", savedLeave.getId());

        return savedLeave;
    }

    // View all leave requests
    @GetMapping
    public List<LeaveRequest> getAllLeaves() {
        return leaveRequestRepository.findAll();
    }
}
