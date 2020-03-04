import { UserService } from './../../user.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppUser } from 'src/app/models/app.user';
import { map } from 'rxjs/operators';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

export interface UserData {
  name: string;
  lastLogin: Date;
  email: string;
}

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  subscription: Subscription;
  usersData;
  test;
  users: MatTableDataSource<UserData>;;
  displayedColumns: string[] = ['name', 'email', 'lastLogin'];
  resultsLength = 0;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private userService: UserService
  ) {
    this.subscription = this.userService.getAll().snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as AppUser }))
      )
    ).subscribe( users => {
      //this.users = users;
      this.usersData = users;
      this.users =  new MatTableDataSource(users);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
     // if (plans.length === 0) { this.bPlansAvailable = false; } else {this.bPlansAvailable = true; }
    });
  }

  ngOnInit() {
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();

    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  sortData(event, table) {
    if ( event.direction === 'asc') {
      this.users = this.usersData.sort((a, b) =>
      {
        // return a.userData.lastLogin - b.userData.lastLogin;
        if (a.userData.lastLogin > b.userData.lastLogin) { return 1; }
        if (a.userData.lastLogin < b.userData.lastLogin) { return -1; }
        return 0;
       });
    }
    if ( event.direction === 'desc') {
      this.users = this.usersData.sort((a, b) =>
      {
        // return a.userData.lastLogin - b.userData.lastLogin;
        if (a.userData.lastLogin > b.userData.lastLogin) { return -1; }
        if (a.userData.lastLogin < b.userData.lastLogin) { return 1; }
        return 0;
       });
    }
    if ( event.direction === '') {
      this.users = this.usersData;
    }

    // new MatTableDataSource(this.users)
    this.users.paginator = this.paginator;
    table.renderRows();
    // this.users.sort = this.sort;


  }


}
