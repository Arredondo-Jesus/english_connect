import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Course } from '../models/Course';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  API_URI = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  getCourses() {
    return this.http.get(`${this.API_URI}/courses`);
  }

  getCourse(id: string) {
    return this.http.get(`${this.API_URI}/courses/${id}`);
  }

  saveCourse(course: Course) {
    return this.http.post(`${this.API_URI}/courses`, course);
  }

  deleteCourse(id: string) {
    return this.http.delete(`${this.API_URI}/courses/${id}`);
  }

  updateCourse(id: string, updatedCourse: Course) {
    this.http.put(`${this.API_URI}/courses/${id}`, updatedCourse);
  }
}
