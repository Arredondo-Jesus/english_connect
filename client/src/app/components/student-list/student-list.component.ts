import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { StudentsService } from '../../services/students.service';
import { Student } from 'src/app/models/Student';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  students: any = [];

  student: Student = {
    id: 0,
    status: 'inactive'
  };

  course: Course = {
    id: 0
  };

  constructor(private studentsService: StudentsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.getStudents();
  }

  getStudents() {
    this.studentsService.getStudents().subscribe(
      res => {
        this.students = res;
      },
      err => console.log(err)
    );
  }

  deleteStudent(id: number) {
    this.student.id = id;
    this.studentsService.deleteStudent(this.student.id, this.student).subscribe(
      res => {
        console.log(res);
        this.getStudents();
      },
      err => console.log(err)
    );
  }

}