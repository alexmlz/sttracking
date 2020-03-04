import { Exercise } from './../models/exercise';
import { map } from 'rxjs/operators';
import { ExerciseService } from './../exercise.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-createexercisedialog',
  templateUrl: './createexercisedialog.component.html',
  styleUrls: ['./createexercisedialog.component.css']
})
export class CreateexercisedialogComponent implements OnInit {
  exercises$;
  exercises;
  exercise = {
    name: ' ',
    saetze: 1
  };

  constructor(
    private exerciseService: ExerciseService,
    public dialogRef: MatDialogRef<CreateexercisedialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.exercises$ = this.exerciseService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(e => ({ key: e.payload.key, ...e.payload.val() as Exercise})  )
      )
    ).subscribe( exercises => {
      this.exercises = exercises;
    });
  }

  onAddClick(oExercise) {
    let sSatz;
    let iSatz;
    const newExercise = this.exercises[oExercise.name];
    newExercise.saetze = [];
    const iSaetze = oExercise.saetze;
    const path = 'users/' + this.data.userId + '/plans/' + this.data.planId + '/' + this.data.sectionId + '/exercises';
    delete newExercise.key;
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
