import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ShiftService } from './shift.service';
import { NurseService, Nurse } from '../nurse/nurse.service';

@Component({
selector: 'app-shift',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './shift.component.html',
styleUrl: './shift.component.css'
})
export class ShiftComponent implements OnInit {

nurses: Nurse[] = [];
shifts: any[] = [];

nurseId!: number;
shiftDate = '';
timeSlot = '';

timeSlots = ['MORNING', 'EVENING', 'NIGHT'];

successMessage = '';
errorMessage = '';

constructor(
    private shiftService: ShiftService,
    private nurseService: NurseService
  ) {}

  ngOnInit() {
    this.loadNurses();   // ✅ only nurses on page load
  }

  loadNurses() {
    this.nurseService.getAllNurses().subscribe(data => {
      this.nurses = data;
    });
  }

  // ✅ POST: Assign Shift
  assignShift() {
    this.successMessage = '';
    this.errorMessage = '';

    this.shiftService.assignShift(
      this.nurseId,
      this.shiftDate,
      this.timeSlot
    ).subscribe({
      next: () => {
        this.successMessage = 'Shift assigned successfully';
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Shift assignment failed';
      }
    });
  }

  // ✅ GET: View Shifts
  loadShifts() {
    this.shiftService.getAllShifts().subscribe({
      next: data => {
        this.shifts = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load shifts';
      }
    });
  }
}
