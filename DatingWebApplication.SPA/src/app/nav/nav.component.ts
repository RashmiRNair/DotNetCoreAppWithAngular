import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/altertify.service';
import { release } from 'os';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
/** nav component*/
export class NavComponent implements OnInit {


  model: any = {};
  photoUrl: string;
  /** nav ctor */
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) {

  }

  ngOnInit(): void {
    this.authService.currentPhotoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
    })
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
    this.alertify.success("Logged in succesfully");
    }, error => {
        this.alertify.error(error);
      }, () => {
        this.router.navigate(["/members"]);
      });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message("Logged out");
    this.router.navigate(["/home"]);  
  }
}
