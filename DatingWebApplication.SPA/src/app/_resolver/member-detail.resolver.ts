import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { User } from '../_models/user';
import {  ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/altertify.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';



@Injectable()
export class MemberDetailResolver implements Resolve<User>{
  constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService) {

  }

  resolve(route: ActivatedRouteSnapshot):  Observable<User> {
    return this.userService.getUser(route.params['id']).pipe(
      catchError(error => {
        this.alertifyService.error("Problem getting user data");
        this.router.navigate["/member"];
        return of(null);
      })
    );
  }
}
