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

  edit = false;

  constructor(private attendanceService: AttendanceService, private router: Router, private activatedRoute: ActivatedRoute,
              private datePipe: DatePipe) {
              this.today = this.datePipe.transform(this.today, 'yyyy-MM-dd');
            }

  ngOnInit() {
    this.getGroup();
    this.getOptions();
    this.attendance.date = this.today;
  }

  getOptions() {
    for (let i = 1; i < 25; i++) {
      let value: any;
      value = i + 1;
      this.options.push({option: value.toString()});
    }
  }

  getGroup() {
    const params = this.activatedRoute.snapshot.params;
    this.course.id = params.id;
    this.attendance.date = params.date;

    if (params.date) {
      this.edit = true;
    } else {
      this. edit = false;
    }

    if (this.edit === false) {
      this.attendanceService.getGroup(this.course.id).subscribe(
        res => {
          console.log(this.attendanceValues);
          this.studentList = res;
          for (const student of this.studentList) {
            this.attendanceValues.push('Yes');
          }
        },
        err => console.log(err)
      );
    } else if (this.edit === true) {
      this.attendanceService.getAttendanceByGroup(this.course.id, this.attendance.date).subscribe(
        res => {
          console.log(res);
          this.studentList = res;
          this.today = this.datePipe.transform(this.studentList[0].date, 'yyyy-MM-dd');
          this.attendance.date = this.today;
          for (const student of this.studentList) {
            this.attendanceValues.push(student.attendance_value);
          }
        },
        err => console.log(err)
      );
    }
  }

  getAttendanceByDate() {
    this.attendanceService.geAttendanceByDate(this.course.id).subscribe(
      res => {
        this.attendanceList = res;
        console.log(res);
      },
      err => console.log(err)
    );
  }

  updateAttendance(id: string) {
    this.attendance.date = this.activatedRoute.snapshot.params.date;
    this.attendanceService.updateAttendance(id, this.attendance.date, this.attendance).subscribe(
      res => {
        console.log(res);
        this.getAttendanceByDate();
        this.edit = true;
      },
      err => console.log(err)
    );
  }

  saveNewAttendanceList() {
    delete this.attendance.created_at;
    delete this.attendance.id;
    delete this.attendance.status;

    this.getAttendanceAll();

    for (const attendance of this.attendanceList) {
      this.attendanceService.saveAttendance(attendance)
      .subscribe(
        res => {
          this.getGroup();
          this.router.navigate(['attendance/group/', this.course.id]);
          console.log(attendance);
        },
         err => console.log(err)
      );
    }
  }

  getAttendanceAll() {

    for (let i = 0; i < this.attendanceValues.length; i++) {

      const newAttendance: Attendance = {};
      newAttendance.date = this.attendance.date;
      newAttendance.attendance_value = this.attendanceValues[i];
      newAttendance.lesson = this.attendance.lesson + 1;
      newAttendance.student_id = this.studentList[i].id;
      this.attendanceList[i] = newAttendance;

    }
  }

}
