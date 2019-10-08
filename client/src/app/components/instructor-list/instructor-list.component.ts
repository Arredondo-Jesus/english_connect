import { Component, OnInit } from '@angular/core';

import { InstructorsService } from '../../services/instructors.service';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  constructor(private instructorsService: InstructorsService ) { }

  instructors: any = [];

  ngOnInit() {
    this.getInstructors();
  }

  getInstructors() {
    this.instructorsService.getInstructors().subscribe(
      res => {
        this.instructors = res;
      },
      err => console.log(err)
    );
  }

  deleteInstructor(id: string) {
    this.instructorsService.deleteInstructor(id).subscribe(
      res => {
        console.log(res);
        this.getInstructors();
      },
      err => console.log(err)
    );
  }

}
