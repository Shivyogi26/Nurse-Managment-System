import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
providedIn: 'root'
})
export class LeaveService {

private baseUrl = '/api/leaves';

constructor(private http: HttpClient) {}

  requestLeave(nurseId: number, date: string, reason: string): Observable<any> {
    return this.http.post(
      `${this.baseUrl}?nurseId=${nurseId}&date=${date}&reason=${reason}`,
      {}
    );
  }

  getAllLeaves(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }
}
