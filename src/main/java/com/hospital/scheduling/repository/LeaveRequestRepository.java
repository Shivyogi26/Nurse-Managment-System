package com.hospital.scheduling.repository;

import com.hospital.scheduling.entity.LeaveRequest;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LeaveRequestRepository extends JpaRepository<LeaveRequest, Long> {
}
