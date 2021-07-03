import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import * as firebase from 'firebase/app';
import 'firebase/auth'
@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false
  constructor(public firebaseAuth: AngularFireAuth) { }
  async signin(email: string, password: string) {
    await this.firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
      .catch(err => {
        console.log(err);

      })
  }
  async signup(email: string, password: string) {
    await this.firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
      })
      .catch(err => {
        console.log(err);

      })
  }
  async loginwithGoogle() {
    await this.firebaseAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).then(
      res => {
        this.isLoggedIn = true
        console.log('login successful',res);

      }
    ).catch(err => {
      console.log(err);

    });
  }


  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }
}