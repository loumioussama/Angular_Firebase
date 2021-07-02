import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm?: FormGroup;

  constructor() { }

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
  signUp(): void {
    console.log(this.signUpForm?.value)    
    // this.authService.login(this.signUpForm?.value);
  }

}
