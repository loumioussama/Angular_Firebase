import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm?: FormGroup;
  isSignedIn = false

  constructor(public firebaseService : FirebaseService) { }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm(): any {
    this.signUpForm = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      lastname: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  
  async onSignup(){
    await this.firebaseService.signup(this.signUpForm?.get('email').value,this.signUpForm?.get('email').value)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }
  async onSignin(email:string,password:string){
    await this.firebaseService.signin(email,password)
    if(this.firebaseService.isLoggedIn)
    this.isSignedIn = true
  }

}
