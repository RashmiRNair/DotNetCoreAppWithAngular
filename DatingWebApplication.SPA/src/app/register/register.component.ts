import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'protractor';
import { AlertifyService } from '../_services/altertify.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
/** register component*/
export class RegisterComponent {
  model: any = {};
  @Output() cancelRegister = new EventEmitter();

  /** register ctor */
  constructor(private authService: AuthService, private alertify: AlertifyService) {

  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.success("Registration successful");
    }, error => {
        this.alertify.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
