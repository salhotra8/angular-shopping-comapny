import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable, of, switchMap } from 'rxjs';
import { User } from '../model/user-data';
import { doc, onSnapshot } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class UserService {

// user$ : Observable<User | any>;
private itemDoc!: AngularFirestoreDocument<User>;


  constructor(
    private afs: AngularFirestore,
    private auth : AngularFireAuth) { 

  }


  updateUser( user: User | any){
    const userRef : AngularFirestoreDocument<User> = this.afs.doc(`/users/${user.uid}`);
    const data = {
      uid:user.uid,
      name:user.displayName,
      email:user.email,
    };

  userRef.set(data , { merge: true});
  }

  updateUserName(user: User| any, data: any){
    this.afs.doc(`/users/${user.uid}`).update(data);
  }
    

}



