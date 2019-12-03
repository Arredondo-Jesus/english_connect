import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from 'src/app/models/User';
import { Instructor } from 'src/app/models/Instructor';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { FireBaseUser } from 'src/app/models/fireBaseUser';

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
    '1',
    '2'
  ];

  fireBaseUser: FireBaseUser = {
    uid: '',
    email: '',
    disabled: false,
    password: '',
    role: '',
    status: ''
  };

  edit = false;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute,
              public afAuth: AngularFireAuth) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const params = this.activatedRoute.snapshot.params;
    if (params.uid) {
      this.userService.getUserById(params.uid)
        .subscribe(
          res => {
            this.fireBaseUser = JSON.parse(res.toString());
            this.edit = true;
            console.log(this.fireBaseUser.uid);
          },
          err => console.log(err)
        );
    }
  }

  saveNewUser() {
    delete this.fireBaseUser.password;
    delete this.fireBaseUser.disabled;

    this.userService.saveUser(this.fireBaseUser).subscribe(
      res => {
        console.log(res);
        this.fireBaseUser.status = 'active';
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

  updateUser2() {
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
    return this.afAuth.auth.createUserWithEmailAndPassword(this.fireBaseUser.email, this.fireBaseUser.password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
        this.saveNewUser();
        this.router.navigate(['users']);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  resetPasword() {
    this.afAuth.auth.sendPasswordResetEmail(this.fireBaseUser.email)
    .then((result) => {
      window.alert('Password has been reset successfully');
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  updateUser() {
    this.userService.updateUser(this.fireBaseUser.uid, this.fireBaseUser).subscribe(
      res => {
        console.log(res);
        this.fireBaseUser = res;
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

  disableUser(disabled: boolean) {
    if (disabled === true) {
      this.fireBaseUser.disabled = false;
    } else if (disabled === false) {
      this.fireBaseUser.disabled = true;
    }
    this.userService.updateUser(this.fireBaseUser.uid, this.fireBaseUser).subscribe(
      res => {
        console.log(this.fireBaseUser);
        this.router.navigate(['users']);
      },
      err => console.log(err)
    );
  }

}
