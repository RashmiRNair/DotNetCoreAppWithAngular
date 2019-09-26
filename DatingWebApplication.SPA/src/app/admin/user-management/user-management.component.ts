import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/user';
import { AdminService } from '../../_services/admin.service';
import { AlertifyService } from '../../_services/altertify.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { RoleModalComponent } from '../role-modal/role-modal.component';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {
  users: User[];
  bsModalRef: BsModalRef;

  constructor(private adminService: AdminService, private alertify: AlertifyService, private modalService: BsModalService) { }

  ngOnInit() {
    this.getUserWithRoles();
  }


  getUserWithRoles() {
    this.adminService.getUsersWithRoles().subscribe((user: User[]) => {
      this.users = user;
    }, error => {
        this.alertify.error(error);
    });
  }

  editUserRoles(user: User) {
    const initialState = {
      user,
      roles: this.getRolesArray(user)
    };
    this.bsModalRef = this.modalService.show(RoleModalComponent, { initialState });
    this.bsModalRef.content.updateSelectedRoles.subscribe((values) => {
      const rolesToUpdate = {
        rolesName: [...values.filter(e => e.checked === true).map(e=>e.name)]
      }
      if (rolesToUpdate) {
        this.adminService.updateUserRoles(user, rolesToUpdate).subscribe(() => {
          user.roles = [...rolesToUpdate.rolesName];
        }, error => {
            this.alertify.error(error);
        });
      }
    });
  
 
  }

  private getRolesArray(user) {
    const role = [];
    const userRole = user.roles;
    const availableRoles: any[] = [
      { name: "Admin", value: "Admin" },
      { name: "Moderator", value: "Moderator" },
      { name: "Member", value: "Member" },
      { name: "VIP", value: "VIP" },
    ];

    for (var i = 0; i < availableRoles.length; i++) {
      let isMatch = false;
      for (var j = 0; j < userRole.length; j++) {
        if (availableRoles[i].name === userRole[j]) {
          isMatch = true;
          availableRoles[i].checked = true;
          role.push(availableRoles[i]);
          break;
        }
      }
      if (!isMatch) {
        availableRoles[i].checked = false;
        role.push(availableRoles[i]);
      }
    }
    return role;
  }


}
