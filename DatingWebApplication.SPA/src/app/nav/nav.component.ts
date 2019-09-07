import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/altertify.service';
import { release } from 'os';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
/** nav component*/
export class NavComponent {

  model: any = {};
  /** nav ctor */
  constructor(public authService: AuthService, private alertify: AlertifyService) {

  }

  login() {
    this.authService.login(this.model).subscribe(next => {
    this.alertify.success("Logged in succesfully");
    }, error => {
        this.alertify.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  logout() {
    localStorage.removeItem('token');
    this.alertify.message("Logged out");
  }
}
