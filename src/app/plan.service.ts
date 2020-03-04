import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database'; 

@Injectable({
  providedIn: 'root'
})
export class PlanService {

  constructor(private db: AngularFireDatabase) { }

  getAll(userId) {
      return this.db.list('users/' + userId + '/plans');
  }

  getAllSamples() {
    return this.db.list('plans', ref => ref.orderByChild('st').equalTo(false));
}

  get(planId) {
    return this.db.object('/plans/' + planId + '/name' );
  }

  getUserPlanName(planId, userid) {
    return this.db.object('users/' + userid + '/plans/' + planId + '/name' );
  }

  getSections(planId) {
    return this.db.list('/plans/' + planId );
  }

  getExcersice(planId, sectionId) {
    return this.db.list('/plans/' + planId + '/' + sectionId + '/exercises');
  }

  getUserExcersice(sPath) {
    return this.db.list('/users/' + sPath + '/exercises');
  }

  update(path , value) {
    return this.db.object(path).update(value);
  }

  getSatz(sPath) {
    this.db.object(sPath).valueChanges().subscribe(satz => satz);
  }

  createUserEx(path, userplan) {
    return this.db.object('/users/' + path + '/exercises').set(userplan);
  }

  updateUserPlanData(userId, planId, value) {
    return this.db.object('/users/' + userId + '/userData/usedPlans/' + planId).update(value);
  }

  getSectionName(planId, sectionId){
    return this.db.object('/plans/' + planId + '/' + sectionId + '/name' );
  }

  createPlan(sId, sName) {
    return this.db.object('plans/' + sId).set({name: sName});
  }

  createUserPlan(sUserId, sName) {
    return this.db.list('users/' + sUserId + '/plans/').push({name: sName});
  }

  createSampleUserPlan(sUserId, oPlan) {
    return this.db.list('users/' + sUserId + '/plans/').push(oPlan);
  }

  deleteUserPlan(sPath) {
    return this.db.object(sPath).remove();
  }

  publishPlan(oPlan) {
    return this.db.list('/plans/').push(oPlan);
  }

}
