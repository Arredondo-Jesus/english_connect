import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AttendanceService } from '../../services/attendance.service';
import { Student } from '../../models/Student';
import { Course } from '../../models/Course';
import { Attendance } from '../../models/Attendance';

@Component({
  selector: 'app-attendance-list-registration',
  templateUrl: './attendance-list-registration.component.html',
  styleUrls: ['./attendance-list-registration.component.css'],
  providers: [DatePipe]
})
export class AttendanceListRegistrationComponent implements OnInit {

  today: any = new Date();
  studentList: any = [];
  options: any = [{option: '1'}];
  values: any = [{value: 'Yes'}, {value: 'No'}];

  attendanceValues: any = [];
  attendanceList: any = [];

  attendance: Attendance  = {
    id: 0,
    date: new Date(),
    attendance_value: '',
    lesson: 0,
    student_id: 0,
    status: 'active'
  };

  student: Student = {
    id: 0,
    name: '',
    last_name: '',
    status: ''
  };

  course: Course = {
    id: 0,
    status: ''
  };

  constructor(private attendanceService: AttendanceService, private router: Router, private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) {
              this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
            }

  ngOnInit() {
    this.getGroup();
    this.getOptions();
  }

  getOptions() {
    for (let i = 0; i < 25; i++) {
      let value: any;
      value = i + 1;
      this.options[i] = {option: value.toString()};
    }
  }

  getGroup() {
    const params = this.activatedRoute.snapshot.params;
    this.course.id = params.id;

    this.attendanceService.getGroup(this.course.id).subscribe(
      res => {
        console.log(res);
        this.studentList = res;
      },
      err => console.log(err)
    );
  }

  saveNewAttendanceList() {
    delete this.attendance.created_at;
    delete this.attendance.id;
    delete this.attendance.status;

    this.attendanceService.saveAttendance(this.attendance)
      .subscribe(
        res => {
          this.getGroup();
          this.getAttendanceAll();
          console.log(this.attendanceValues);
          console.log(this.attendanceList);
        },
         err => console.log(err)
      );
  }

  getAttendanceAll() {

    for (let i = 0; i < this.attendanceValues.length; i++) {

      const newAttendance: Attendance = {};
      newAttendance.date = this.attendance.date;
      newAttendance.lesson = this.attendance.lesson;
      newAttendance.student_id = this.studentList[i].id;
      newAttendance.attendance_value = this.attendanceValues[i];
      this.attendanceList[i] = newAttendance;

    }
  }

}
