import { Component, OnInit, Input } from '@angular/core';
import { Message } from '../../_models/message';
import { UserService } from '../../_services/user.service';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/altertify.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};


  constructor(private userService: UserService, private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.loadMessages();
  }



  loadMessages() {
    const userId = +this.authService.decodedToken.nameid;
    this.userService.getMessageThread(this.authService.decodedToken.nameid, this.recipientId).pipe(
      tap(message => {
        for (let i = 0; i < message.length; i++) {
          if (message[i].isRead === false && message[i].recipientId === userId) {
            this.userService.markAsRead(message[i].id, userId);
          }            
        }
      })
    ).subscribe(messages => {
      this.messages = messages;
    }, error => {
      this.alertifyService.error(error);
    });      
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedToken.nameid, this.newMessage).subscribe((message:Message) => {
      this.messages.unshift(message);
      this.newMessage.content = "";
    }, error => {
        this.alertifyService.error(error);
    })
  }
}
