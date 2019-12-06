import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentsService } from '../../services/students.service';
import { Student } from 'src/app/models/Student';
import { Course } from 'src/app/models/Course';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any = [];
  permissions: any = [];

  student: Student = {
    id: 0,
    status: 'inactive'
  };

  course: Course = {
    id: 0
  };

  constructor(private studentsService: StudentsService, private router: Router, private activatedRoute: ActivatedRoute,
              private userService: UserService, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.getStudentByGroup();
    } else {
      this.getPermissions(this.afAuth.auth.currentUser.email);
      this.getStudents();
    }
  }

  getStudents() {
    this.studentsService.getStudents().subscribe(
      res => {
        this.students = res;
      },
      err => console.log(err)
    );
  }

  getStudentByGroup() {
    this.course.id = this.activatedRoute.snapshot.params.id;
    this.studentsService.getStudentsInGroup(this.course.id).subscribe(
      res => {
        this.students = res;
      },
      err => console.log(err)
    );
  }

  deleteStudent(id: number) {
    const params = this.activatedRoute.snapshot.params;
    this.student.id = id;
    this.studentsService.deleteStudent(this.student.id, this.student).subscribe(
      res => {
        console.log(res);
        if (params.id) {
          this.getStudentByGroup();
        } else {
          this.getStudents();
        }
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
