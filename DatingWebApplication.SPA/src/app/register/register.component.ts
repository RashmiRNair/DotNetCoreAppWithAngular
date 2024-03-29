import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

import { AlertifyService } from '../_services/altertify.service';
import { AuthService } from '../_services/auth.service';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/user';



@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
/** register component*/
export class RegisterComponent implements OnInit {

  user: User;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  /** register ctor */
  constructor(private authService: AuthService, private alertify: AlertifyService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.bsConfig = {
      containerClass: "theme-red"
    },

    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender:["male"],
      username: ["", Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ["", Validators.required],
      country: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ["", Validators.required]
    }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(g: FormControl) {
    return g.get("password").value === g.get("confirmPassword").value ? null : { "mismatch": true };
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      this.authService.register(this.user).subscribe(() => {
        this.alertify.success("Registration successful");
      }, error => {
        this.alertify.error(error);
     }, () => {
          this.authService.login(this.user).subscribe(() => {
          this.router.navigate(["/members"]);
      });
    });
   }
 }

  cancel() {
    this.cancelRegister.emit(false);
  }


}
