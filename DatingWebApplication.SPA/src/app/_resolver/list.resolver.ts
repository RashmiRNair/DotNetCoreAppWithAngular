import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { User } from '../_models/user';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/altertify.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';



@Injectable()
export class ListResolver implements Resolve<User[]>{
  pageNumber = 1;
  pageSize = 5;
  likesParam = 'Likees';

  constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    return this.userService.getUsers(this.pageNumber, this.pageSize, null,this.likesParam).pipe(
      catchError(error => {
        this.alertifyService.error("Problem getting users data");
        this.router.navigate["/home"];
        return of(null);
      })
    );
  }
}
