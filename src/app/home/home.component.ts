import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
selector: 'app-home',
standalone: true,
imports: [CommonModule, RouterLink],
template: `
<div class="home-container">
<h1>Hospital Scheduling System</h1>

<div class="home-links">
<a routerLink="/nurses">Nurse Management</a>
<a routerLink="/shifts">Shift Management</a>
<a routerLink="/leaves">Leave Management</a>
</div>
</div>
`,
styles: [`
.home-container {
max-width: 600px;
margin: 80px auto;
text-align: center;
font-family: Arial, Helvetica, sans-serif;
}

.home-links {
margin-top: 40px;
display: flex;
flex-direction: column;
gap: 20px;
font-size: 18px;
}

.home-links a {
text-decoration: none;
padding: 12px;
border: 1px solid #ccc;
}
`]
})
export class HomeComponent {}
