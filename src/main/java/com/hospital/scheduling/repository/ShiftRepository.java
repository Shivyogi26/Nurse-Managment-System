package com.hospital.scheduling.repository;

import com.hospital.scheduling.entity.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    // Used later for overlap validation
    List<Shift> findByNurseIdAndShiftDate(Long nurseId, LocalDate shiftDate);
}
