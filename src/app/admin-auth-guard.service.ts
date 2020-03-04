import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { calcPossibleSecurityContexts } from '@angular/compiler/src/template_parser/binding_parser';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private auth: AuthService, private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.auth.appUser$.pipe(
      map(appUser => {
       return appUser.isAdmin;
      })
    );


    // return this.auth.user$
    // .pipe(
    //   switchMap(user => { return this.userService.get(user.uid).valueChanges()
    //     .pipe(
    //       map(appUser => appUser.isAdmin)
    //     );
    //   })
    // );
  }


}
