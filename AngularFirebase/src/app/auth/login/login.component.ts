import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fieldTextType = true;
  loginForm?: FormGroup;
  isSignedIn = false

  constructor(private firebaseService: FirebaseService, public router :Router) { }

  ngOnInit(): void {
    this.initLoginForm();

  }
  initLoginForm(): any {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }
  get email(): any {
    return this.loginForm?.get('email');
  }
  get password(): any {
    return this.loginForm?.get('password');
  }

  async onSignin() {
    if (this.loginForm?.valid) {
        await this.firebaseService.signin(this.loginForm?.get('email').value, this.loginForm?.get('password').value)
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true
      this.router.navigate(['/home']);

    }
    else {
      console.log("error");

    }
    }
   

  }
  async login() {
    await this.firebaseService.loginwithGoogle()
    if (this.firebaseService.isLoggedIn) {
      this.isSignedIn = true
      this.router.navigate(['/home']);

    }
    else {
      console.log("error");

    }

  }


}
