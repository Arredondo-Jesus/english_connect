import { Component, OnInit, HostBinding } from '@angular/core';
import { Course } from 'src/app/models/Course';
import { Router } from '@angular/router';

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
    level: 0,
    year: '',
    day: '',
    time: '',
    building: '',
    created_at: new Date(),
    instructor_id: 0
  };

  constructor(private courseService: CoursesService, private router: Router) { }

  ngOnInit() {
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

}

