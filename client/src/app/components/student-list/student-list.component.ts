import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../../services/students.service';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {

  constructor(private studentsSevervice: StudentsService) { }

  students: any = [];


  ngOnInit() {
    this.getStudents();
  }

  getStudents() {
    this.studentsSevervice.getStudents().subscribe(
      res => {
        this.students = res;
      },
      err => console.log(err)
    );
  }

  deleteStudent(id: string) {
    this.studentsSevervice.deleteStudent(id).subscribe(
      res => {
        console.log(res);
        this.getStudents();
      },
      err => console.log(err)
    );
  }

}
