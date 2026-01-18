package com.hospital.scheduling.controller;

import com.hospital.scheduling.entity.Nurse;
import com.hospital.scheduling.repository.NurseRepository;
import com.hospital.scheduling.service.AuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/nurses")
public class NurseController {

    @Autowired
    private NurseRepository nurseRepository;

    @Autowired
    private AuditService auditService;

    // 1️⃣ Create Nurse
    @PostMapping
    public Nurse createNurse(@RequestBody Nurse nurse) {
        Nurse savedNurse = nurseRepository.save(nurse);

        // ✅ Audit log
        auditService.log("CREATE", "NURSE", savedNurse.getId());

        return savedNurse;
    }

    // 2️⃣ Get All Nurses
    @GetMapping
    public List<Nurse> getAllNurses() {
        return nurseRepository.findAll();
    }

    // 3️⃣ Get Nurse By ID
    @GetMapping("/{id}")
    public Nurse getNurseById(@PathVariable Long id) {
        return nurseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nurse not found with id " + id));
    }

    // 4️⃣ Update Nurse
    @PutMapping("/{id}")
    public Nurse updateNurse(@PathVariable Long id, @RequestBody Nurse nurseDetails) {

        Nurse nurse = nurseRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Nurse not found with id " + id));

        nurse.setName(nurseDetails.getName());
        nurse.setRole(nurseDetails.getRole());
        nurse.setDepartment(nurseDetails.getDepartment());

        Nurse updatedNurse = nurseRepository.save(nurse);

        // ✅ Audit log
        auditService.log("UPDATE", "NURSE", updatedNurse.getId());

        return updatedNurse;
    }

    // 5️⃣ Delete Nurse
    @DeleteMapping("/{id}")
    public String deleteNurse(@PathVariable Long id) {
        nurseRepository.deleteById(id);

        // ✅ Audit log
        auditService.log("DELETE", "NURSE", id);

        return "Nurse deleted successfully";
    }
}
