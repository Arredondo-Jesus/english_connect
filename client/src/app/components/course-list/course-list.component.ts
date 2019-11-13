import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../services/students.service';
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
    status: 'inactive',
    count: 0
  };

  constructor(private coursesService: CoursesService, private studentService: StudentsService, router: Router) { }

  ngOnInit() {
    this.getCourses();
  }

  getCourses() {
    this.coursesService.getCourses().subscribe(
      res => {
        this.courses = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  deleteCourse(id: number) {
    delete this.course.count;

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
