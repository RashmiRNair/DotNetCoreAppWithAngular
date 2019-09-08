import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
/** home component*/
export class ListsComponent {
  
  /** home ctor */
  constructor(private http: HttpClient) {
   
  }


}
