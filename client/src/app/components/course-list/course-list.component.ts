import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: any = [];

  course: Course = {
    id: 0,
    status: 'inactive'
  };

  constructor(private coursesService: CoursesService, private router: Router) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.coursesService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.log(err)
    );
  }

  deleteCourse(id: number) {
    this.course.id = id;
    this.coursesService.deleteCourse(this.course.id, this.course).subscribe(
      res => {
        console.log(res);
        this.getCourses();
      },
      err => console.log(err)
    );
  }

}
