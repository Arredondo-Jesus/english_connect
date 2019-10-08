import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Instructor } from '../models/Instructor';

@Injectable({
  providedIn: 'root'
})
export class InstructorsService {

  constructor(private http: HttpClient) { }

  API_URI = 'http://localhost:3000/api';

  getInstructors() {
    return this.http.get(`${this.API_URI}/instructors`);
  }

  getInstructor(id: string) {
    return this.http.get(`${this.API_URI}/instructors/${id}`);
  }

  saveInstructor(instructor: Instructor) {
    return this.http.post(`${this.API_URI}/instructors`, instructor);
  }

  deleteInstructor(id: string) {
    return this.http.delete(`${this.API_URI}/instructors/${id}`);
  }

  updateInstructor(id: string | number, updatedInstructor: Instructor) {
    return this.http.put(`${this.API_URI}/instructors/${id}`, updatedInstructor);
  }
}
