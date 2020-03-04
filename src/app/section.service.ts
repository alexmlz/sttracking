import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database'; 

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  constructor(private db: AngularFireDatabase) { }

  createSetion(sPath, sName) {
    return this.db.object(sPath).set({name: sName});
  }

  createUserSetion(sPath, sName) {
    return this.db.list(sPath).push({name: sName});
  }

  getUserSections(planId, userId) {
    return this.db.list('users/' + userId + '/plans/' + planId );
  }

  deleteSection(sPath) {
    return this.db.object(sPath).remove();
  }

}
