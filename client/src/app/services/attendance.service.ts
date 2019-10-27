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

  geAttendanceByDate(id: string | number) {
    return this.http.get(`${this.API_URI}/attendance/group/${id}`);
  }

  getGroup(id: string | number) {
    return this.http.get(`${this.API_URI}/attendance/register/${id}`);
  }

  getOneAttendance(id: string) {
    return this.http.get(`${this.API_URI}/attendance/${id}`);
  }

  saveAttendance(attendance: Attendance) {
    return this.http.post(`${this.API_URI}/attendance`, attendance);
  }

  deleteAttendance(id: string | number, updatedStatus: Attendance) {
    return this.http.put(`${this.API_URI}/attendance/delete/${id}`, updatedStatus);
  }

  updateAttendance(id: string | number, updatedAttendance: Attendance) {
    return this.http.put(`${this.API_URI}/attendance/${id}`, updatedAttendance);
  }
}
