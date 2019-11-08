import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Student } from '../../models/Student';
import { StudentsService} from '../../services/students.service';
import { Course } from 'src/app/models/Course';
import { Attendance } from 'src/app/models/Attendance';
import { AttendanceService } from '../../services/attendance.service';

@Component({
  selector: 'app-student-list-group',
  templateUrl: './student-list-group.component.html',
  styleUrls: ['./student-list-group.component.css']
})
export class StudentListGroupComponent implements OnInit {

  students: any = [];

  edit = false;

  student: Student = {
    id: 0,
    status: 'inactive'
  };
  course: Course = {
    id: 0
  };

  attendance: Attendance = {
    id: 0,
    date: new Date(),
    attendance_value: ''
  };

  constructor(private studentService: StudentsService, private router: Router, private activatedRoute: ActivatedRoute,
              private attendaceService: AttendanceService) { }

  ngOnInit() {
    this.getByGroup();
  }

  getByGroup() {
    this.course.id = this.activatedRoute.snapshot.params.id;
    this.attendance.date = this.activatedRoute.snapshot.params.date;


    this.studentService.getStudentsByGroup(this.course.id, this.attendance.date).subscribe(
      res => {
        this.students = res;
      },
      err => console.log(err)
    );
  }

  updateAttendance(id: string) {
    this.attendaceService.updateAttendance(id, this.attendance).subscribe(
      res => {
        console.log(res);
        this.getByGroup();
        this.edit = true;
      },
      err => console.log(err)
    );
  }

}
