import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../services/students.service';
import { Course } from 'src/app/models/Course';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { access } from 'fs';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: any = [];
  permissions: any = [];
  email =  '';

  course: Course = {
    id: 0,
    status: 'inactive',
    count: 0,
    instructorName: '',
    last_name: '',
    instructorEmail: ''
  };

  constructor(private coursesService: CoursesService, private studentService: StudentsService, router: Router,
              private userService: UserService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getPermissions(this.afAuth.auth.currentUser.email);
    this.email = this.afAuth.auth.currentUser.email;
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

  getPermissions(email: string) {
    this.userService.getUserPermissions(email).subscribe(
      res => {
        console.log(res);
        this.permissions = res;
      },
      err => console.log(err)
    );
  }

}
