import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
/** home component*/
export class MemberListComponent {
  
  /** home ctor */
  constructor(private http: HttpClient) {
   
  }


}
