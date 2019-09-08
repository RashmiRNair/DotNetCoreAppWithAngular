import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-messsages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
/** home component*/
export class MessagesComponent {
  
  /** home ctor */
  constructor(private http: HttpClient) {
   
  }


}
