import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: any = [];

  user: User = {
    id: 0,
    username: '',
    password: '',
    role: '',
    status: 'inactive'
  };

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsers();
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

}
