import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/altertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
/** home component*/
export class MemberListComponent implements OnInit {
  
  users: User[];
  
  /** home ctor */
  constructor(private userService:UserService, private alertifyService: AlertifyService, private route: ActivatedRoute) {
   
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    })
  }
 
}
