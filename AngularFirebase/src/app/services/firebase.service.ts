import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/storage';  
import { Upload } from '../models/upload';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  isLoggedIn = false;
  basePath = '/uploads';
  listingsCollection =  this.af.firestore.collection('listings');
  constructor(public firebaseAuth: AngularFireAuth , private db : AngularFireDatabase, private af : AngularFirestore ) { }
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
       console.log("Signup successful", res);
       
      })
      .catch(err => {
        console.log(err);

      })
  }
  async loginwithGoogle() {
    await this.firebaseAuth.signInWithPopup(new firebase.default.auth.GoogleAuthProvider()).then(
      res => {
        this.isLoggedIn = true
        localStorage.setItem('user', JSON.stringify(res.user))
        console.log('login successful',res);

      }
    ).catch(err => {
      console.log(err);

    });
  }

  pushUpload(upload: Upload) {
    const storageRef = firebase.default.storage().ref();
    const uploadTask = storageRef.child(`${this.basePath}/${upload.file.name}`).put(upload.file);

    uploadTask.on(firebase.default.storage.TaskEvent.STATE_CHANGED,
      (snapshot: firebase.default.storage.UploadTaskSnapshot) => {
        // upload in progress
        const snap = snapshot;
        upload.progress = (snap.bytesTransferred / snap.totalBytes) * 100;
      },
      (error) => {
        // upload failed
        console.log(error);
      },
      async () => {
        // upload success
        console.log(uploadTask);
        upload.url = uploadTask.snapshot.downloadURL;
        upload.name = upload.file.name;
        this.listingsCollection.add({
          'createdAt': new Date(),
          'name' : upload.file.name,
          'fullPath': uploadTask.snapshot.ref.fullPath,
          'downloadUrl': await uploadTask.snapshot.ref.getDownloadURL(),
          'author': upload.author,
        }).then(
          response => console.log(response)
        ).catch(
          error => console.log(error)
        )
      },
    );
  }

  async getListings() {
    const snapshot = await this.listingsCollection.get()
    return snapshot.docs.map(doc => doc.data());  
  }

  logout() {
    this.firebaseAuth.signOut()
    localStorage.removeItem('user')
  }
}