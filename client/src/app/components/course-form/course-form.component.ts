import { Component, OnInit, HostBinding } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { UseExistingWebDriver } from 'protractor/built/driverProviders';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.css']
})
export class CourseFormComponent implements OnInit {

  @HostBinding('class') classes = 'row';

  course: Course = {
    id: 0,
    level: 0,
    year: '',
    day: '',
    time: '',
    building: '',
    created_at: new Date(),
    instructor_id: 0
  };

  edit = false;

  constructor(private courseService: CoursesService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
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

    this.courseService.saveCourse(this.course)
      .subscribe(
        res => {
          console.log(this.course);
          this.router.navigate(['/courses']);
        },
         err => console.log(err)
      );

  }

  updateCourse() {
    delete this.course.created_at;

    this.courseService.updateCourse(this.course.id, this.course)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['/courses']);
          },
          err => console.log(err)
        );
  }

}

