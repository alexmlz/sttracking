import { Component, OnInit } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { PlanService } from '../plan.service';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Plan } from '../models/plan';

@Component({
  selector: 'app-createsheet',
  templateUrl: './createsheet.component.html',
  styleUrls: ['./createsheet.component.css']
})

export class CreatesheetComponent implements OnInit {
  userId;
  bSamplePlan = true;
  samplePlans;
  subscription: Subscription;
  ngOnInit() {
   this.userId = this.auth.getUserId();
  }

  constructor(private bottomSheetRef: MatBottomSheetRef<CreatesheetComponent>,
              private planService: PlanService,
              private auth: AuthService) {
                this.getPlans();
              }

getPlans() {
this.subscription = this.planService.getAllSamples().snapshotChanges()
  .pipe(
    map(changes =>
     changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Plan }))
      )
       ).subscribe( plans => {
        this.samplePlans = plans;
         });
        }

  createPlan(planName) {
  /*     this.planService.createPlan(planId.value, planName.value).then(plan => {
        this.bottomSheetRef.dismiss();
      }); */
      this.planService.createUserPlan(this.userId, planName.value).then(plan => {
        this.bottomSheetRef.dismiss();
      });
  }

  createSamplePlan(plan) {
    debugger;
    const planModel = plan.model;
    delete planModel.key;
    this.planService.createSampleUserPlan(this.userId, planModel).then( () => {
      this.bottomSheetRef.dismiss();
    });
  }

  onCancelClick() {
    this.bottomSheetRef.dismiss();
  }

}
