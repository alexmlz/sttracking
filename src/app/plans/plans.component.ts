import { LoginMeSnackBarComponent } from './../login-me-snack-bar/login-me-snack-bar.component';
import { PlanService } from './../plan.service';
import { Component, OnInit } from '@angular/core';
import { Plan } from '../models/plan';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import {MatBottomSheet} from '@angular/material/bottom-sheet';
import { CreatesheetComponent } from '../createsheet/createsheet.component';
import { AuthService } from '../auth.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {
  showSpinner = true;
  bEdit = false;
  bPublish = false;
  plans: Plan[];
  bPlansAvailable = false;
  subscription: Subscription;
  userId;
  appUser;

constructor(
  private planService: PlanService,
  private bottomSheet: MatBottomSheet,
  private auth: AuthService,
  private snackBar: MatSnackBar) {
    this.userId = this.auth.getUserId();
    if (this.userId) {
      this.getPlans();
    } else {
      auth.appUser$.subscribe(appUser => {
        this.appUser = appUser;
        this.userId = this.auth.getUserId();
        this.getPlans();
      });
    }
}

getPlans() {
  if (this.userId) {
    this.subscription = this.planService.getAll(this.userId).snapshotChanges()
    .pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Plan }))
      )
    ).subscribe( plans => {
      this.showSpinner = false;
      this.plans = plans;
      if (plans.length === 0) { this.bPlansAvailable = false; } else {this.bPlansAvailable = true; }
    });
  } else {
    this._showLoginMessage();
    this.showSpinner = false;
  }
}

_showLoginMessage() {
  this.snackBar.openFromComponent(LoginMeSnackBarComponent , {
    duration: 2000
  });
}

openCreatePlanSheet() {
  if (this.userId) {
    this.bottomSheet.open(CreatesheetComponent);
  } else {
    this._showLoginMessage();
  }
}

onEdit() {
  this.bEdit = !this.bEdit;
}

onDeletePlan(plan) {
  const sPath = 'users/' + this.userId + '/plans/' + plan.key;
  this.planService.deleteUserPlan(sPath);
}

openPublishPlan() {
  this.bPublish = !this.bPublish;
}

onPublishPlanSave(plan) {
  plan.st = false;
  delete plan.key;
  this.planService.publishPlan(plan);
}

ngOnInit() {
  this.userId = this.auth.getUserId();
}

}
