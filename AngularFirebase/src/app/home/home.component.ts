import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Upload } from '../models/upload';
import { FirebaseService , } from '../services/firebase.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Video } from '../models/Video';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public firebaseService : FirebaseService , public router :Router,private modalService: NgbModal) { }
  currentUpload: Upload;
  user : any = JSON.parse(localStorage.getItem("user"));
  videos = [];
  ngOnInit(): void {
    this.firebaseService.getListings().then(
      docs => {
        this.videos = docs;
        console.log(docs);
      }
    )
    }

  async logout() {
    await this.firebaseService.logout()
    this.router.navigate(['/']);
  }

  fileChangeEvent(files : File[]){
    const file = files[0];
    this.currentUpload = new Upload(file);
    this.currentUpload.author = this.user.uid;
    this.firebaseService.pushUpload(this.currentUpload);
    this.firebaseService.getListings().then(
      docs => {
        this.videos = docs;
        console.log(docs);
      }
    )

  }
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title',windowClass:"sm-modal"}).result.then((result) => {
 
    });
  }
}
