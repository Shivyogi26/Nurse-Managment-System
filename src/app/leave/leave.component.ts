import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LeaveService } from './leave.service';
import { NurseService, Nurse } from '../nurse/nurse.service';

@Component({
selector: 'app-leave',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './leave.component.html',
styleUrl: './leave.component.css'
})
export class LeaveComponent implements OnInit {

nurses: Nurse[] = [];
leaves: any[] = [];

nurseId!: number;
leaveDate = '';
reason = '';

successMessage = '';
errorMessage = '';

constructor(
    private leaveService: LeaveService,
    private nurseService: NurseService
  ) {}

  ngOnInit() {
    this.loadNurses();   // ✅ Only load nurses on page load
  }

  loadNurses() {
    this.nurseService.getAllNurses().subscribe(data => {
      this.nurses = data;
    });
  }

  // ✅ POST: Request Leave
  submitLeave() {
    this.successMessage = '';
    this.errorMessage = '';

    this.leaveService.requestLeave(
      this.nurseId,
      this.leaveDate,
      this.reason
    ).subscribe({
      next: () => {
        this.successMessage = 'Leave request submitted successfully';
        this.reason = '';
      },
      error: err => {
        this.errorMessage = err.error?.message || 'Leave request failed';
      }
    });
  }

  // ✅ GET: Load Leave Requests (on button click)
  loadLeaves() {
    this.leaveService.getAllLeaves().subscribe({
      next: data => {
        this.leaves = data;
      },
      error: () => {
        this.errorMessage = 'Failed to load leave requests';
      }
    });
  }
}
