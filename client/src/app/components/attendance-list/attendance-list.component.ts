import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Attendance } from '../../models/Attendance';
import { AttendanceService } from '../../services/attendance.service';
import { Course } from 'src/app/models/Course';

@Component({
  selector: 'app-attendance-list',
  templateUrl: './attendance-list.component.html',
  styleUrls: ['./attendance-list.component.css']
})
export class AttendanceListComponent implements OnInit {

  attendanceList: any = [];

  attendance: Attendance = {
    id: 0,
    date: new Date(),
    status: 'inactive'
  };

  course: Course = {
    id: 0
  };


  constructor(private attendanceService: AttendanceService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    const params = this.activatedRoute.snapshot.params;
    this.course.id = params.id;
    this.attendance.date = params.date;
    this.getAttendanceByDate();
  }

  getAttendance() {
    this.attendanceService.geAttendance().subscribe(
      res => {
        this.attendanceList = res;
      },
      err => console.log(err)
    );
  }

  getAttendanceByDate() {
    this.attendanceService.geAttendanceByDate(this.course.id).subscribe(
      res => {
        this.attendanceList = res;
      },
      err => console.log(err)
    );
  }

  deleteAttendance(id: number) {
    this.attendance.id = id;
    this.attendanceService.deleteAttendance(this.attendance.id, this.attendance).subscribe(
      res => {
        console.log(res);
        this.getAttendance();
      },
      err => console.log(err)
    );
  }
}
