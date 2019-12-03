import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  permission: any = [{
    access: 0
  }];

  constructor(public afAuth: AngularFireAuth, private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.getPermissions(this.afAuth.auth.currentUser.email);
  }

  signOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }

  getPermissions(email: string) {
    this.userService.getUserPermissions(email).subscribe(
      res => {
        console.log(res);
        this.permission = res;
      },
      err => console.log(err)
    );
  }

}
