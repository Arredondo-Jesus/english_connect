import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Student} from '../models/Student';

@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000/api';

  getStudents() {
    return this.http.get(`${this.API_URI}/students`);
  }

  getStudent(id: string) {
    return this.http.get(`${this.API_URI}/students/${id}`);
  }

  saveStudent(student: Student) {
    return this.http.post(`${this.API_URI}/students`, student);
  }

  deleteStudent(id: string) {
    return this.http.delete(`${this.API_URI}/students/${id}`);
  }

  updateInstructor(id: string, updatedStudent: Student) {
    this.http.put(`${this.API_URI}/students/${id}`, updatedStudent);
  }
}
