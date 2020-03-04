import { SectionService } from './../section.service';
import { Section } from './../models/section';
import { PlanService } from './../plan.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { MatBottomSheet } from '@angular/material';
import { CreatesectionsheetComponent } from '../createsectionsheet/createsectionsheet.component';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-plandetails',
  templateUrl: './plandetails.component.html',
  styleUrls: ['./plandetails.component.css']
})
export class PlandetailsComponent {
woman = false;
id;
userId;
bEdit;
plan;
appUser;
noDataEinheit = false;
sections: Section[];
subscription: Subscription;
showSpinner = true;
  constructor(
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute,
    private planService: PlanService,
    private sectionService: SectionService,
    private bottomSheet: MatBottomSheet) {
    this.userId = this.auth.getUserId();
    if (this.userId) {
      this.getSections();
    } else {
      auth.appUser$.subscribe(appUser => {
        this.appUser = appUser;
        this.userId = this.auth.getUserId();
        this.getSections();
      });
    }

 }

getSections() {
  this.id = this.route.snapshot.paramMap.get('id');
  if (this.id) {
if (this.id === 'womangk') {
  this.woman = true;
} else {
  this.woman = false;
}
this.planService.getUserPlanName(this.id, this.userId).valueChanges()
.pipe(take(1)).subscribe(plan  => {
  this.plan = plan;
});
this.subscription = this.sectionService.getUserSections(this.id, this.userId).snapshotChanges()
.pipe(
  map(changes =>
    changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Section }))
  )
).subscribe( sections => {
  sections.forEach((section, key) => {
    if (section.key === 'name') {
      sections.splice(key , 1);
    }
  });
  sections.forEach((section, key) => {
    if (section.key === 'st') {
      sections.splice(key , 1);
    }
  });
  this.sections = sections;
  this.showSpinner = false;
  if (sections.length === 0) { this.noDataEinheit = false; } else {this.noDataEinheit = true; }
});
}
 }

 onEdit() {
  this.bEdit = !this.bEdit;
}

 openCreateSectionSheet() {
  this.bottomSheet.open(CreatesectionsheetComponent, {
    data: { planId: this.id }});
 }

 onDeleteSection(section) {
  const sPath = 'users/' + this.userId + '/plans/' + this.id + '/' + section.key;
  this.sectionService.deleteSection(sPath);
}

}
