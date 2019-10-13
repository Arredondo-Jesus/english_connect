import { Component, OnInit, HostBinding } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';


import { StudentsService } from './../../services/students.service';
import { Student } from './../../models/Student';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {


  @HostBinding('class') classes = 'row';

  student: Student = {
    id: 0,
    name: '',
    last_name: '',
    age: '',
    email: '',
    phone: '',
    created_at: new Date(),
    status: ''
  };

  edit = false;

  constructor(private studentsService: StudentsService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
   this.getStudent();
  }

  getStudent() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.studentsService.getStudent(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.student = res;
            this.edit = true;
          },
          err => console.log(err)
        );
    }
  }

  saveNewStudent() {
    delete this.student.created_at;
    delete this.student.id;
    delete this.student.status;

    this.studentsService.saveStudent(this.student)
      .subscribe(
        res => {
          console.log(this.student);
          this.router.navigate(['students']);
        },
         err => console.log(err)
      );

  }

  updateStudent() {
    delete this.student.created_at;
    delete this.student.status;

    this.studentsService.updateStudent(this.student.id, this.student)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['students']);
          },
          err => console.log(err)
        );
  }
}
