import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './../model/user-data';
import { UserService } from './user.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$!: Observable<User | any>;
  redirectUrl: string | null = null;
  user: any;

  constructor(private auth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private userService: UserService) {

      this.UserCheck();
    
  }

    UserCheck(){
      return this.user$ = this.auth.authState.pipe(switchMap
        ((user: any) => {
          if (user) {
            this.user = user;
            return this.afs.doc<User>(`/users/${user.uid}`).valueChanges();
  
          }
          else return of(null);
        }
        ));
    }


  loginWithGoogle() {
    this.auth.signInWithPopup
      (new firebase.auth.GoogleAuthProvider()).
      then((result) => {
        this.userService.updateUser(result.user);
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        }
        else this.router.navigate(["/home"]);

      });
  }


  signUpWithEmailAndPassword(name: string, email: string, password: string) {
    this.auth.createUserWithEmailAndPassword(email, password).
      then((result) => {
        this.userService.updateUser(result.user);
        this.userService.updateUserName(result.user, { name: name });

        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        }

        else this.router.navigate(["/home"]);


      })

  }

  signIn(email: string, password: string) {
    this.auth.signInWithEmailAndPassword(email, password).
      then((user) => {
        this.userService.updateUser(user);
        if (this.redirectUrl) {
          this.router.navigate([this.redirectUrl]);
          this.redirectUrl = null;
        }

        else this.router.navigate(["/home"]);
        console.log(user);

      });
  }


  logout() {
    this.auth.signOut();
    this.router.navigate(['/home'])
  }


}
