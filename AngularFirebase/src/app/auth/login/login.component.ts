import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  fieldTextType = true;
  loginForm?: FormGroup;
  constructor(    private authService: AuthService,
    ) { }

  ngOnInit(): void {
  }
  initLoginForm(): any {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }
  get email(): any {
    return this.loginForm?.get('email');
  }
  get password(): any {
    return this.loginForm?.get('password');
  }
  login(): void {
    this.authService.login(this.loginForm?.value);
  }

}
