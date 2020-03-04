import { UserService } from './user.service';
import { AppUser } from './models/app.user';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
// import * as firebase from 'firebase';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  userId: string;
  appUser: AppUser;
  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
    .pipe(
      switchMap(user => {
        if (user) {
          this.userId = user.uid;
          return this.userService.get(user.uid).valueChanges();
        }
        return of(null);
      })
    );
  }

  getUserId() {
    return this.userId;
  }

/*   get userID() {
    this.afAuth.authState.subscribe(user => {
      if (user) { this.userId = user.uid;
                  return this.userId;
      }
    });
  } */
}
