package com.hospital.scheduling.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "leave_request")
public class LeaveRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate leaveDate;

    private String reason;

    private String status; // PENDING, APPROVED, REJECTED

    @ManyToOne
    @JoinColumn(name = "nurse_id", nullable = false)
    private Nurse nurse;

    // Constructors
    public LeaveRequest() {
    }

    public LeaveRequest(LocalDate leaveDate, String reason, String status, Nurse nurse) {
        this.leaveDate = leaveDate;
        this.reason = reason;
        this.status = status;
        this.nurse = nurse;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public LocalDate getLeaveDate() {
        return leaveDate;
    }

    public void setLeaveDate(LocalDate leaveDate) {
        this.leaveDate = leaveDate;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Nurse getNurse() {
        return nurse;
    }

    public void setNurse(Nurse nurse) {
        this.nurse = nurse;
    }
}
