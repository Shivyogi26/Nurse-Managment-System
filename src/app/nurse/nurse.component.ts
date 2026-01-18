import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NurseService, Nurse } from './nurse.service';

@Component({
selector: 'app-nurse',
standalone: true,
imports: [CommonModule, FormsModule],
templateUrl: './nurse.component.html',
styleUrl: './nurse.component.css'
})
export class NurseComponent implements OnInit {

title = 'Nurse List';

nurses: Nurse[] = [];

loading: boolean = true;

// ---- Add / Edit Nurse form model ----
newNurseName: string = '';
newNurseRole: string = '';
newNurseDepartment: string = '';

// ---- Edit state ----
isEditMode: boolean = false;
editingNurseId: number | null = null;

constructor(
    private nurseService: NurseService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.nurseService.getAllNurses().subscribe({
      next: (data) => {
        this.nurses = [...data];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ERROR FROM BACKEND:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // ---- ADD or UPDATE Nurse ----
  addNurse(): void {

    // validation
    if (!this.newNurseName || !this.newNurseRole || !this.newNurseDepartment) {
      alert('Please fill all fields');
      return;
    }

    const nursePayload = {
      name: this.newNurseName,
      role: this.newNurseRole,
      department: this.newNurseDepartment
    };

    // ---- UPDATE MODE (PUT) ----
    if (this.isEditMode && this.editingNurseId !== null) {

      this.nurseService.updateNurse(this.editingNurseId, nursePayload).subscribe({
        next: (updatedNurse) => {
          this.nurses = this.nurses.map(n =>
            n.id === updatedNurse.id ? updatedNurse : n
          );

          this.resetForm();
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('ERROR UPDATING NURSE:', err);
          alert('Failed to update nurse');
        }
      });

      return;
    }

    // ---- ADD MODE (POST) ----
    this.nurseService.addNurse(nursePayload).subscribe({
      next: (savedNurse) => {
        this.nurses = [...this.nurses, savedNurse];

        this.resetForm();
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('ERROR ADDING NURSE:', err);
        alert('Failed to add nurse');
      }
    });
  }

  // ---- ENTER EDIT MODE ----
  editNurse(nurse: Nurse): void {
    this.isEditMode = true;
    this.editingNurseId = nurse.id;

    this.newNurseName = nurse.name;
    this.newNurseRole = nurse.role;
    this.newNurseDepartment = nurse.department;
  }

  // ---- Reset form ----
  resetForm(): void {
    this.newNurseName = '';
    this.newNurseRole = '';
    this.newNurseDepartment = '';
    this.isEditMode = false;
    this.editingNurseId = null;
  }

  deleteNurse(id: number): void {

  const confirmDelete = confirm('Are you sure you want to delete this nurse?');

  if (!confirmDelete) {
    return;
  }

  this.nurseService.deleteNurse(id).subscribe({
    next: () => {
      // remove nurse from UI
      this.nurses = this.nurses.filter(nurse => nurse.id !== id);
      this.cdr.detectChanges();
    },
    error: (err) => {
      console.error('ERROR DELETING NURSE:', err);
      alert('Failed to delete nurse');
    }
  });
}

}
