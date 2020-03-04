import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database'; 

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  constructor(private db: AngularFireDatabase) { }

  getAll() {
    return this.db.list('exercises');
  }

  createExercise(sPath, oExercise) {
    return this.db.list(sPath).push(oExercise);
  }

  addSatz(sPath, oSatz, iIndex) {
    return this.db.object(sPath + '/' + iIndex).set(oSatz);
  }

  deleteSatz(sPath) {
    return this.db.object(sPath).remove();
  }

  deleteExercise(sPath) {
    return this.db.object(sPath).remove();
  }
}
