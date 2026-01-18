package com.hospital.scheduling.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "shift")
public class Shift {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate shiftDate;

    private String timeSlot; // e.g. MORNING, EVENING, NIGHT

    @ManyToOne
    @JoinColumn(name = "nurse_id", nullable = false)
    private Nurse nurse;

    // --- Constructors ---

    public Shift() {
    }

    public Shift(LocalDate shiftDate, String timeSlot, Nurse nurse) {
        this.shiftDate = shiftDate;
        this.timeSlot = timeSlot;
        this.nurse = nurse;
    }

    // --- Getters & Setters ---

    public Long getId() {
        return id;
    }

    public LocalDate getShiftDate() {
        return shiftDate;
    }

    public void setShiftDate(LocalDate shiftDate) {
        this.shiftDate = shiftDate;
    }

    public String getTimeSlot() {
        return timeSlot;
    }

    public void setTimeSlot(String timeSlot) {
        this.timeSlot = timeSlot;
    }

    public Nurse getNurse() {
        return nurse;
    }

    public void setNurse(Nurse nurse) {
        this.nurse = nurse;
    }
}
