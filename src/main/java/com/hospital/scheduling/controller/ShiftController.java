package com.hospital.scheduling.controller;

import com.hospital.scheduling.entity.Nurse;
import com.hospital.scheduling.entity.Shift;
import com.hospital.scheduling.repository.NurseRepository;
import com.hospital.scheduling.repository.ShiftRepository;
import com.hospital.scheduling.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/shifts")
public class ShiftController {

    @Autowired
    private ShiftRepository shiftRepository;

    @Autowired
    private NurseRepository nurseRepository;

    @Autowired
    private AuditService auditService;

    // Assign a shift to a nurse
    @PostMapping
    public Shift assignShift(
            @RequestParam Long nurseId,
            @RequestParam String date,
            @RequestParam String timeSlot
    ) {

        Nurse nurse = nurseRepository.findById(nurseId)
                .orElseThrow(() -> new RuntimeException("Nurse not found"));

        LocalDate shiftDate = LocalDate.parse(date);

        // 🔒 Overlap validation
        List<Shift> existingShifts =
                shiftRepository.findByNurseIdAndShiftDate(nurseId, shiftDate);

        for (Shift shift : existingShifts) {
            if (shift.getTimeSlot().equalsIgnoreCase(timeSlot)) {
                throw new IllegalStateException(
                        "Shift already assigned for this nurse on this date and time slot"
                );
            }
        }

        Shift shift = new Shift();
        shift.setShiftDate(shiftDate);
        shift.setTimeSlot(timeSlot);
        shift.setNurse(nurse);

        Shift savedShift = shiftRepository.save(shift);

        // ✅ Audit log (after successful assignment)
        auditService.log("ASSIGN_SHIFT", "SHIFT", savedShift.getId());

        return savedShift;
    }

    // View all shifts
    @GetMapping
    public List<Shift> getAllShifts() {
        return shiftRepository.findAll();
    }
}
