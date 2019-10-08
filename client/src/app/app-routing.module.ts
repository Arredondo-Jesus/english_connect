import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CourseListComponent } from './components/course-list/course-list.component';
import { InstructorListComponent } from './components/instructor-list/instructor-list.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { CourseFormComponent } from './components/course-form/course-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { InstructorFormComponent } from './components/instructor-form/instructor-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'courses',
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
    path: 'students',
    component: StudentListComponent
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
    path: 'login',
    component: LoginFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
