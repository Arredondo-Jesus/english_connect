import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Permission } from 'src/app/models/Permission';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  permissions: any = [];

  permission: Permission = {
    access: 0,
    section: ''
  };

  admin = false;
  i = 0;

  constructor(public afAuth: AngularFireAuth, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getPermissions(this.afAuth.auth.currentUser.email);
    this.permissions.forEach(permission => {
      this.permission = permission;
      this.permissions[this.i] = this.permission;
      this.i = this.i + 1;
    });
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/']);
    });
  }

  getPermissions(email: string) {
    this.userService.getUserPermissions(email).subscribe(
      res => {
        console.log(res);
        this.permissions = res;
      },
      err => console.log(err)
    );
  }

}
