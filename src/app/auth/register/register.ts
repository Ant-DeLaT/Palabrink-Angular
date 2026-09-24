import { Component } from '@angular/core';
import { PasswordService } from '../password.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatError } from '@angular/material/input';


@Component({
  selector: 'app-register',
  providers: [PasswordService],
  imports: [MatError],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  public registerForm: FormGroup;

  constructor(private formb: FormBuilder, private passwordService: PasswordService /*, private validate*/) {
    this.registerForm = this.formb.group({
      user: ['', [Validators.required, passwordService.nameValidator]],
      email: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password_verify: ['', [Validators.required, Validators.minLength(6) /*,passwordService.verifySamePasswd*/]],
    })
  }

  verifySamePasswd() {

  }
}
