import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import { InstructorListComponent } from './components/instructor-list/instructor-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { InstructorFormComponent } from './components/instructor-form/instructor-form.component';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { AttendanceListComponent } from './components/attendance-list/attendance-list.component';
import { StudentListGroupComponent } from './components/student-list-group/student-list-group.component';
import { AttendanceListRegistrationComponent } from './components/attendance-list-registration/attendance-list-registration.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'attendance/group/:id',
    component: AttendanceListComponent
  },
  {
    path: 'attendance/register/:id',
    component: AttendanceListRegistrationComponent
  },
  {
    path: 'courses',
    component: CourseListComponent
  },
  {
    path: 'course/add',
    component: CourseFormComponent
  },
  {
    path: 'course/edit/:id',
    component: CourseFormComponent
  },
  {
    path: 'course/delete/:id',
    component: CourseListComponent
  },
  {
    path: 'instructors',
    component: InstructorListComponent
  },
  {
    path: 'instructors/add',
    component: InstructorFormComponent
  },
  {
    path: 'instructor/edit/:id',
    component: InstructorFormComponent
  },
  {
    path: 'instructor/delete/:id',
    component: InstructorListComponent
  },
  {
    path: 'students',
    component: StudentListComponent
  },
  {
    path: 'student/add',
    component: StudentFormComponent
  },
  {
    path: 'student/edit/:id',
    component: StudentFormComponent
  },
  {
    path: 'student/delete/:id',
    component: StudentListComponent
  },
  {
    path: 'student/group/:id/:date',
    component: StudentListGroupComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }