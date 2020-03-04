import { SectionService } from './../section.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-createsectionsheet',
  templateUrl: './createsectionsheet.component.html',
  styleUrls: ['./createsectionsheet.component.css']
})
export class CreatesectionsheetComponent implements OnInit {

  constructor(private bottomSheetRef: MatBottomSheetRef<CreatesectionsheetComponent>,
              private sectionService: SectionService,
              private auth: AuthService,
              @Inject(MAT_BOTTOM_SHEET_DATA) public data: any) { }
    userId;
  ngOnInit() {
    this.userId = this.auth.getUserId();
  }

  createSection(sectionName) {
    const path = 'users/' + this.userId + '/plans/' + this.data.planId + '/';
    this.sectionService.createUserSetion(path, sectionName).then(() => {
    this.bottomSheetRef.dismiss();
    });
}

onCancelClick() {
  this.bottomSheetRef.dismiss();
}

}
