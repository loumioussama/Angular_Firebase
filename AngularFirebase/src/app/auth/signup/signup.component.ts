import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm?: FormGroup;
  isSignedIn = false

  constructor(public firebaseService : FirebaseService , public router :Router) { }

  ngOnInit(): void {
    this.initSignUpForm();
  }

  initSignUpForm(): any {
    this.signUpForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  get name(): any {
    return this.signUpForm?.get('name');
  }
  get lastname(): any {
    return this.signUpForm?.get('lastname');
  }
  get email(): any {
    return this.signUpForm?.get('email');
  }
  get password(): any {
    return this.signUpForm?.get('password');
  }
  get confirmPassword(): any {
    return this.signUpForm?.get('confirmPassword');
  }
  
  async onSignup(){
    if (this.signUpForm?.valid) {

    await this.firebaseService.signup(this.signUpForm?.get('email').value,this.signUpForm?.get('password').value)
    this.router.navigate(['/']);

  }
}
 

}
