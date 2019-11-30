import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { FireBaseUser } from 'src/app/models/fireBaseUser';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];
  fireBaseUsers: any = [];

  user: User = {
    id: 0,
    username: '',
    password: '',
    role: '',
    status: 'inactive'
  };

  fireBaseUser: FireBaseUser = {
    uid: '',
    email: '',
    disabled: false
  };

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getFirebaseUsers();
  }

  getFirebaseUsers() {
    this.userService.getUsers().subscribe(
      res => {
        console.log(res);
        this.fireBaseUsers = res;
      },
      err => console.log(err)
    );
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      res => {
        console.log(res);
        this.users = res;
      },
      err => console.log(err)
    );
  }

  deleteUser(id: number) {
    this.user.id = id;
    this.userService.deleteUsers(this.user.id, this.user).subscribe(
      res => {
        console.log(res);
        this.getUsers();
      },
      err => console.log(err)
    );
  }

  getById(uid: string) {
    this.userService.getUserById(uid).subscribe(
      res => {
        this.fireBaseUser = res;
        console.log('Found user ' + this.fireBaseUser.uid);
      },
      err => console.log(err)
    );
  }
}
