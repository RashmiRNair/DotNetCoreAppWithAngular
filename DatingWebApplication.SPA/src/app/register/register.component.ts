import { Component, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { error } from 'protractor';

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
  constructor(private authService: AuthService) {

  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      console.log("Registration successful");
    }, error => {
        console.log(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
