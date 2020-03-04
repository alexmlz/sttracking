import { AppUser } from './models/app.user';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import {  AngularFireObject } from '@angular/fire/database';
import 'firebase/database'; 
// import * as firebase from 'firebase';
// import 'firebase/database';
import { isError } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.User) {
    const dDate = new Date();
    this.db.object('/users/' + user.uid + '/userData/').update({
      name : user.displayName,
      email: user.email,
      lastLogin: dDate
    });
  }

  get(uid: string): AngularFireObject<AppUser> {
   return this.db.object('/users/' + uid + '/userData/');
  }

  getAll() {
    return this.db.list('users');
  }
}
