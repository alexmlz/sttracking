import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import 'firebase/database'; 

@Injectable({
  providedIn: 'root'
})
export class SatzService {

  constructor(private db: AngularFireDatabase) { }

  update(path , value) {
    return this.db.object(path).update(value);
  }
}
