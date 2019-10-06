import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Attendance } from '../models/Attendance';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000/api';

  geAttendance() {
    return this.http.get(`${this.API_URI}/attendance`);
  }

  getOneAttendance(id: string) {
    return this.http.get(`${this.API_URI}/attendance/${id}`);
  }

  saveAttendance(attendance: Attendance) {
    return this.http.post(`${this.API_URI}/attendance`, attendance);
  }

  deleteAttendance(id: string) {
    return this.http.delete(`${this.API_URI}/attendance/${id}`);
  }

  updateAttendance(id: string, updatedAttendance: Attendance) {
    this.http.put(`${this.API_URI}/attendance/${id}`, updatedAttendance);
  }
}
