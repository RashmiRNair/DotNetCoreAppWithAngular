import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/altertify.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {

  }

  canActivate(): boolean {
    if (this.authService.loggedIn()) {
       return true;
    }
    this.alertify.error("You need to log in!!");
    this.router.navigate(["/home"]);    
    return false;
  }
}
