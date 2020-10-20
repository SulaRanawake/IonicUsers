import { Injectable } from '@angular/core';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
// import { rejects } from 'assert';
// import { resolve } from 'dns';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore
  ) { }

  signupUser(value){
    return new Promise<any>((resolve,reject) => {
      this.afAuth.createUserWithEmailAndPassword(value.email, value.password).then(res => {
        resolve(res);
        this.db.collection("users").add({
          userEmail : value.email
        })
      }, err=> reject(err))
    })
  }

  loginUser(value){
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(value.email, value.password).then(
        res => resolve(res),
        err => reject(err)
      )
    })
  }

  logoutUser(){
    return new Promise((resolve, reject) => {
      if(this.afAuth.currentUser){
        this.afAuth.signOut().then(()=> {
          console.log("LOG OUT");
          resolve();
        }).catch((error) => {
          reject();
        })
      }
    })
  }

  userDetails(){
    return this.afAuth.user;
  }

  userList(){
    return this.db.collection("users").get();
  }
}
