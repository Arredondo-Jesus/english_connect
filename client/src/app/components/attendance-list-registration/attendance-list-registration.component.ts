import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

import { AttendanceService } from '../../services/attendance.service';
import { Student } from '../../models/Student';
import { Course } from '../../models/Course';

@Component({
  selector: 'app-attendance-list-registration',
  templateUrl: './attendance-list-registration.component.html',
  styleUrls: ['./attendance-list-registration.component.css'],
  providers: [DatePipe]
})
export class AttendanceListRegistrationComponent implements OnInit {

  today: any = new Date();
  attendanceList: any = [];
  options: any = [{option: '1'}];


  attendance: Student = {
    id: 0,
    name: '',
    last_name: ''
  };

  course: Course = {
    id: 0
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
        this.attendanceList = res;
      },
      err => console.log(err)
    );
  }

}
