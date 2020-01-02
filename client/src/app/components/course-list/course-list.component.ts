import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CoursesService } from '../../services/courses.service';
import { StudentsService } from '../../services/students.service';
import { Course } from 'src/app/models/Course';
import { UserService } from 'src/app/services/user.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: any = [];
  filteredCourses: any = [];
  permissions: any = [];
  email =  '';
  count = 0;

  private searchValue: string;

  course: Course = {
    id: 0,
    name: '',
    year: '',
    status: 'inactive',
    count: 0,
    instructorName: '',
    last_name: '',
    instructorEmail: '',
    building: ''
  };

  admin = false;

  get seachName(): string {
    return this.searchValue;
  }

  set searchName(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterName(value);
    this.count = this.filteredCourses.length;
  }

  filterName(searchString: string) {
    return this.courses.filter(course =>
      course.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachYear(): string {
    return this.searchValue;
  }

  set searchYear(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterYear(value);
    this.count = this.filteredCourses.length;
  }

  filterYear(searchString: string) {
    return this.courses.filter(course =>
      course.year.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachDay(): string {
    return this.searchValue;
  }

  set searchDay(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterDay(value);
    this.count = this.filteredCourses.length;
  }

  filterDay(searchString: string) {
    return this.courses.filter(course =>
      course.day.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachTime(): string {
    return this.searchValue;
  }

  set searchTime(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterTime(value);
    this.count = this.filteredCourses.length;
  }

  filterTime(searchString: string) {
    return this.courses.filter(course =>
      course.time.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachBuilding(): string {
    return this.searchValue;
  }

  set searchBuilding(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterBuilding(value);
    this.count = this.filteredCourses.length;
  }

  filterBuilding(searchString: string) {
    return this.courses.filter(course =>
      course.building.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachStudents(): string {
    return this.searchValue;
  }

  set searchStudents(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterStudents(value);
    this.count = this.filteredCourses.length;
  }

  filterStudents(searchString: string) {
    return this.courses.filter(course =>
      course.count.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  get seachInstructor(): string {
    return this.searchValue;
  }

  set searchInstructor(value: string) {
    this.searchValue = value;
    this.filteredCourses = this.filterInstructor(value);
    this.count = this.filteredCourses.length;
  }

  filterInstructor(searchString: string) {
    return this.courses.filter(course =>
      course.instructorName.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  constructor(private coursesService: CoursesService, private studentService: StudentsService, private router: Router,
              private userService: UserService, private afAuth: AngularFireAuth, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.email = this.afAuth.auth.currentUser.email;
    this.getPermissions(this.email);
    this.getCourses();
  }

  getCourses() {
    this.coursesService.getCourses().subscribe(
      res => {
        this.courses = res;
        this.filteredCourses = this.courses;
        console.log(res);
        this.count = this.courses.length;
      },
      err => console.log(err)
    );
  }

  deleteCourse(id: number) {
    delete this.course.count;

    this.course.id = id;
    this.coursesService.deleteCourse(this.course.id, this.course).subscribe(
      res =>  {
        console.log(res);
        this.getCourses();
      },
      err => console.log(err)
    );
  }

  getPermissions(email: string) {
    this.userService.getUserPermissions(email).subscribe(
      res => {
        this.permissions = res;
        if (this.permissions[0].name === 'admin') {
          this.admin = true;
        }
        console.log(res);
      },
      err => console.log(err)
    );
}
}
