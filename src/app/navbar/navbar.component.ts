import { Component, OnInit } from '@angular/core';
import { AppUser } from '../models/app.user';
import { AuthService } from '../auth.service';
import {Location} from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  appUser: AppUser;
  userId: string;

  constructor(private auth: AuthService, private location: Location,  private router: Router) {
    auth.appUser$.subscribe(appUser => {
      this.appUser = appUser;
      this.userId = this.auth.getUserId();
    });
  }

  get UserId() {
    return this.userId;
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
    window.location.reload();
   }

   back() {
    this.location.back();
   }

   home() {
    this.router.navigate(['']);
   }


}
