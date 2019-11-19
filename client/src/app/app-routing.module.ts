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
import { UserFormComponent } from './components/user-form/user-form.component';

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
    path: 'attendance/edit/:id/:date',
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
    path: 'student/add/:cid',
    component: StudentFormComponent
  },
  {
    path: 'student/edit/:sid',
    component: StudentFormComponent
  },
  {
    path: 'student/delete/:id',
    component: StudentListComponent
  },
  {
    path: 'students/group/:id/:date',
    component: StudentListGroupComponent
  },
  {
    path: 'students/group/:id',
    component: StudentListComponent
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'user',
    component: UserFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
