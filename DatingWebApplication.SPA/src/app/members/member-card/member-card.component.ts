import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/altertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
    selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
/** home component*/
export class MemberCardComponent implements OnInit {

  @Input() user: User;  
  
  /** home ctor */
  constructor(private userService:UserService, private alertifyService: AlertifyService,private authService:AuthService) {}

  ngOnInit(): void {
   
  }

  sendLike(id: number) {
    this.userService.sendLike(this.authService.decodedToken.nameid, id).subscribe(data => {
      this.alertifyService.success("You have liked " + this.user.userName);
    }, error => {
        this.alertifyService.error(error);
    })
  }

}
