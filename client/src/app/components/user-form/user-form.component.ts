import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';
import { Instructor } from 'src/app/models/Instructor';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  user: User = {
    id: 0,
    username: '',
    password: '',
    role: '',
    number_login: 0
  };

  instructor: Instructor = {
    id: 0,
    name: '',
    last_name: ''
  };

  rols: any = [
    'instructor',
    'admin'
  ];

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  getUser() {
    this.userService.getUser(this.user.username, this.user.password).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  saveNewUser() {
    this.userService.saveUser(this.user).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

}
