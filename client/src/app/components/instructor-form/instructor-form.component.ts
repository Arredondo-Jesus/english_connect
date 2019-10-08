import { Component, OnInit, HostBinding } from '@angular/core';
import { InstructorsService } from '../../services/instructors.service';
import { Instructor } from 'src/app/models/Instructor';
import { Router } from '@angular/router';

@Component({
  selector: 'app-instructor-form',
  templateUrl: './instructor-form.component.html',
  styleUrls: ['./instructor-form.component.css']
})
export class InstructorFormComponent implements OnInit {

  constructor(private instructorService: InstructorsService, private router: Router) { }

  @HostBinding ('class') classes = 'row';

  instructor: Instructor = {
    id: 0,
    name: '',
    last_name: '',
    phone: '',
    email: '',
    created_at: new Date(),
    modified_on: new Date()
  };

  ngOnInit() {
  }

  saveNewInstructor() {
    delete this.instructor.created_at;
    delete this.instructor.id;

    this.instructorService.saveInstructor(this.instructor)
      .subscribe(
        res => {
          console.log(this.instructor);
          this.router.navigate(['/instructors']);
        },
         err => console.log(err)
      );

  }


}
