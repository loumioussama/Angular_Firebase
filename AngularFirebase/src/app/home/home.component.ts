import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public firebaseService : FirebaseService , public router :Router) { }

  ngOnInit(): void {
  }

  async logout() {
    await this.firebaseService.logout()
    this.router.navigate(['/']);
  }
}
