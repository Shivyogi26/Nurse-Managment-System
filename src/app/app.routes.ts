import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NurseComponent } from './nurse/nurse.component';
import { ShiftComponent } from './shift/shift.component';
import { LeaveComponent } from './leave/leave.component';

export const routes: Routes = [
{ path: '', component: HomeComponent },

{ path: 'nurses', component: NurseComponent },
{ path: 'shifts', component: ShiftComponent },
{ path: 'leaves', component: LeaveComponent },

{ path: '**', redirectTo: '' }
];
