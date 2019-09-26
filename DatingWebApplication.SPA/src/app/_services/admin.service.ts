import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { retry } from 'rxjs/operator/retry';
import { User } from '../_models/user';

@Injectable()
export class AdminService {

  baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }

  getUsersWithRoles() {
    return this.httpClient.get(this.baseUrl + 'admin/usersWithRoles');
  }

  updateUserRoles(user: User, roles: {}) {
    return this.httpClient.post(this.baseUrl + 'admin/editRoles/' + user.userName, roles);
  }
}
