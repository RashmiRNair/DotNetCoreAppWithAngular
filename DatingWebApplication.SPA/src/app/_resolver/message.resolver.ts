import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { User } from '../_models/user';
import {  ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/altertify.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Message } from '../_models/message';
import { AuthService } from '../_services/auth.service';


@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
  pageNumber = 1;
  pageSize = 5;
  messageContainer = "Unread";

  constructor(private userService: UserService, private router: Router, private alertifyService: AlertifyService, private authService: AuthService) { }

  resolve(route: ActivatedRouteSnapshot):  Observable<Message[]> {
    return this.userService.getMessages(this.authService.decodedToken.nameid, this.pageNumber, this.pageSize, this.messageContainer).pipe(
      catchError(error => {
        this.alertifyService.error("Problem getting message data");
        this.router.navigate["/home"];
        return of(null);
      })
    );
  }
}
