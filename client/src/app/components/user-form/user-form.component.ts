import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';
import { Instructor } from 'src/app/models/Instructor';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';

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

  edit = false;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute,
              public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const params = this.activatedRoute.snapshot.params;
    if (params.id) {
      this.userService.getUser(params.id)
        .subscribe(
          res => {
            console.log(res);
            this.user = res;
            this.edit = true;
          },
          err => console.log(err)
        );
    }
  }

  saveNewUser() {
    delete this.user.password;

    this.userService.saveUser(this.user).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err)
    );
  }

  editUser() {
    delete this.user.id;
    delete this.user.status;

    this.userService.updateUsers(this.user.id, this.user).subscribe(
      res => {
        console.log(res);
        this.router.navigate(['users']);
      },
      err => console.log(err)
    );
  }

  updateUser() {
    delete this.user.status;

    this.userService.updateUsers(this.user.id, this.user)
        .subscribe(
          res => {
            console.log(res);
            this.router.navigate(['users']);
          },
          err => console.log(err)
        );
  }

  signUp() {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.user.username, this.user.password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
        this.saveNewUser();
      }).catch((error) => {
        window.alert(error.message);
      });
  }

}
