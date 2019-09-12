import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/altertify.service';

@Component({
    selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
/** home component*/
export class MemberCardComponent implements OnInit {

  @Input() user: User;  
  
  /** home ctor */
  constructor(private userService:UserService, private alertifyService: AlertifyService) {
   
  }

  ngOnInit(): void {
   
  }


}
