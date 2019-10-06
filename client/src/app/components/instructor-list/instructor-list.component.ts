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
    this.instructorsService.getInstructors().subscribe(
      res => {
        this.instructors = res;
      },
      err => console.log(err)
    );
  }

}
