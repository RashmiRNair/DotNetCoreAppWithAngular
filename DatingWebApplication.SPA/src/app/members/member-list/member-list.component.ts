import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/altertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { error } from 'util';

@Component({
    selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
/** home component*/
export class MemberListComponent implements OnInit {
  
  users: User[];
  pagination: Pagination;
  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: "male", display: "Males" }, { value: "female", display: "Females" }];
  userParam: any = {};
 

  /** home ctor */
  constructor(private userService:UserService, private alertifyService: AlertifyService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.userParam.gender = this.user.gender === "female" ? "male" : "female";
    this.userParam.minAge = 18;
    this.userParam.maxAge = 99;
    this.userParam.orderBy = "lastActive";
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  resetFilters() {
    this.userParam.gender = this.user.gender === "female" ? "male" : "female";
    this.userParam.minAge = 18;
    this.userParam.maxAge = 99;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParam)
      .subscribe((res: PaginatedResult<User[]>) => {
        this.users = res.result;
        this.pagination = res.pagination;
      }, error => {
          this.alertifyService.error(error);
      })
  }
}
