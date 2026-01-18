import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Nurse {
id: number;
name: string;
role: string;
department: string;
}

@Injectable({
providedIn: 'root'
})
export class NurseService {

// ✅ Changed to relative URL for Angular proxy
private apiUrl = '/api/nurses';

constructor(private http: HttpClient) {}

  // GET all nurses
  getAllNurses(): Observable<Nurse[]> {
    return this.http.get<Nurse[]>(this.apiUrl);
  }

  // POST new nurse
  addNurse(nurse: Partial<Nurse>): Observable<Nurse> {
    return this.http.post<Nurse>(this.apiUrl, nurse);
  }

  // PUT edit nurse
  updateNurse(id: number, nurse: Partial<Nurse>): Observable<Nurse> {
    return this.http.put<Nurse>(`${this.apiUrl}/${id}`, nurse);
  }

  // DELETE remove nurse
  deleteNurse(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, {
      responseType: 'text'
    });
  }
}
