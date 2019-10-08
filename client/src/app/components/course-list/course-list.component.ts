import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: any = [];

  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
   this.getCourses();
  }

  getCourses() {
    this.coursesService.getCourses().subscribe(
      res => {
        this.courses = res;
      },
      err => console.log(err)
    );
  }

  deleteCourse(id: string) {
    this.coursesService.deleteCourse(id).subscribe(
      res => {
        console.log(res);
        this.getCourses();
      },
      err => console.log(err)
    );
  }

}
