import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AngularFireModule} from '@angular/fire'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FirebaseService} from './services/firebase.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { HomeComponent } from './home/home.component';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyAHgX-Re6FYWsVkPTRulppp67ya6E6K2pY",
      authDomain: "angular-fire-66155.firebaseapp.com",
      projectId: "angular-fire-66155",
      storageBucket: "angular-fire-66155.appspot.com",
      messagingSenderId: "132993019422",
      appId: "1:132993019422:web:84582adda2e32eb04c880f",
      measurementId: "G-D3D52RH281"
    }),
    AngularFirestoreModule,
    AngularFireAuthModule,

  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
