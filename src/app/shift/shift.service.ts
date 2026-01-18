import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
providedIn: 'root'
})
export class ShiftService {

// ✅ Use relative URL so Angular proxy can forward it
private baseUrl = '/api/shifts';

constructor(private http: HttpClient) {}

  assignShift(nurseId: number, date: string, timeSlot: string) {
    return this.http.post(
      `${this.baseUrl}?nurseId=${nurseId}&date=${date}&timeSlot=${timeSlot}`,
      {}
    );
  }

  getAllShifts() {
    return this.http.get<any[]>(this.baseUrl);
  }
}
