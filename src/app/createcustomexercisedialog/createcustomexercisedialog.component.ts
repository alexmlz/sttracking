import { Component, OnInit, Inject } from '@angular/core';
import { ExerciseService } from '../exercise.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CreateexercisedialogComponent } from '../createexercisedialog/createexercisedialog.component';

@Component({
  selector: 'app-createcustomexercisedialog',
  templateUrl: './createcustomexercisedialog.component.html',
  styleUrls: ['./createcustomexercisedialog.component.css']
})
export class CreatecustomexercisedialogComponent implements OnInit {

  exercise = {
    name: ' ',
    addInfo: ' ',
    alter: ' ',
    saetze: 1
  };

  constructor(
    private exerciseService: ExerciseService,
    public dialogRef: MatDialogRef<CreateexercisedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }

  onAddClick(oExercise) {
    let sSatz;
    let iSatz;
    const newExercise = {
      saetze: [],
      name: oExercise.name,
      alter: oExercise.alter,
      addInfo: oExercise.addInfo};
    const iSaetze = oExercise.saetze;
    const path = 'users/' + this.data.userId + '/plans/' + this.data.planId + '/' + this.data.sectionId + '/exercises';
    //delete newExercise.key;
    for (let i = 0; i < iSaetze; i++) {
      iSatz = i + 1;
      sSatz = 'satz' + iSatz + '';
      newExercise.saetze.push({
        kg: 0,
        rep: 0,
        rpe: 8
      });
    }
    this.exerciseService.createExercise(path, newExercise);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

}
