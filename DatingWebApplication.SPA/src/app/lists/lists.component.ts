import { Component, OnInit, ViewChildren } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../_models/user';
import { Pagination, PaginatedResult } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../_services/altertify.service';

@Component({
    selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
/** home component*/
export class ListsComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likeParam: string;


  /** home ctor */
  constructor(private http: HttpClient, private authService: AuthService, private userService: UserService,
    private route: ActivatedRoute, private alertifyService: AlertifyService) {
  }


  ngOnInit(){
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
    this.likeParam = "Likees";
  }


  loadUsers() {         
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null,this.likeParam)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
        this.alertifyService.error(error);
      })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
