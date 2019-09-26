import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/altertify.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {

  }

  canActivate(next: ActivatedRouteSnapshot): boolean {
    const roles = next.firstChild.data["roles"] as Array<string>;
    if (roles) {
      const match = this.authService.roleMatch(roles);
      if (match) {
        return true;
      }
      else {
        this.router.navigate(["members"]);
        this.alertify.error("You are not allowed to access this area!");
      }
    }

    if (this.authService.loggedIn()) {
       return true;
    }
    this.alertify.error("You need to log in!!");
    this.router.navigate(["/home"]);    
    return false;
  }
}
