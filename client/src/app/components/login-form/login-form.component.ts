import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Course } from '../../models/Course';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  courses: any = [];

  course: Course = {
    id: 0,
    status: 'inactive',
    count: 0
  };

  user: User = {
    username: '',
    password: ''
  };


  constructor(public afAuth: AngularFireAuth, private router: Router) {}

  ngOnInit() {
    this.signOut();
  }

  signIn() {
    return this.afAuth.auth.signInWithEmailAndPassword(this.user.username, this.user.password)
    .then((result) => {
       this.router.navigate(['courses']);
    }).catch((error) => {
      window.alert(error.message);
    });
  }

  signUp() {
    return this.afAuth.auth.createUserWithEmailAndPassword(this.user.username, this.user.password)
      .then((result) => {
        window.alert('You have been successfully registered!');
        console.log(result.user);
      }).catch((error) => {
        window.alert(error.message);
      });
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}
