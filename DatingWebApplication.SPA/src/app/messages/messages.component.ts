import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '../_models/message';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { UserService } from '../_services/user.service';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/altertify.service';
import { error } from 'protractor';

@Component({
  selector: 'app-messsages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
/** home component*/
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer: "Unread";

  
  /** home ctor */
  constructor(private userService: UserService, private authService: AuthService, private route: ActivatedRoute, private alertifyService:AlertifyService) {
   
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userService.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage,
      this.pagination.itemsPerPage, this.messageContainer).subscribe((res: PaginatedResult<Message[]>) => {
        this.messages = res.result;
        this.pagination = res.pagination;
      }, error => {
          this.alertifyService.error(error);
      });
  }

  pageChanged(event:any):void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  deleteMessage(id: number) {
    this.alertifyService.confirm("Are you sure you want to delete this message", () => {
      this.userService.deleteMessage(id, this.authService.decodedToken.nameid).subscribe(() => {
        this.messages.splice(this.messages.findIndex(m => m.id == id), 1);
        this.alertifyService.success("The message has been deleted");
      }, error => {
          this.alertifyService.error(error);
      })
    })
  }

}
