import { Component, OnInit, HostBinding } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  course: Course = {
    id: 0,
    level: 1,
    year: '',
    day: '',
    time: '',
    building: '',
    created_at: new Date(),
    status: ''
  };

  edit = false;
  submitted = false;
  valid = false;

  constructor(private courseService: CoursesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.getCourse();
  }

  getCourse() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.courseService.getCourse(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.course = res;
            this.edit = true;
          },
          err => console.log(err)
        );
    }
  }

  saveNewCourse() {
    delete this.course.created_at;
    delete this.course.id;
    delete this.course.status;

    this.courseService.saveCourse(this.course)
      .subscribe(
        res => {
          console.log(this.course);
          this.router.navigate(['courses']);
        },
         err => console.log(err)
      );

  }

  updateCourse() {
    delete this.course.created_at;
    delete this.course.status;

    this.courseService.updateCourse(this.course.id, this.course)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['courses']);
          },
          err => console.log(err)
        );
  }
}

