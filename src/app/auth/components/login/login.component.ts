import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../../core/services/header.service';
import { FormService } from '../../services/password.service';
import { FirebaseCnUsers } from '../../services/firebase-cn-users';

@Component({
  selector: 'app-login',
  providers: [FirebaseCnUsers, FormService],
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login implements OnInit {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private _headerService: HeaderService,
    public formService: FormService,
    private _firebaseCnUsers: FirebaseCnUsers,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    this._headerService.title.set('Login');
  }

  onSubmit() {
    console.log(this.loginForm.value);
    const { email, password } = this.loginForm.value;
    this._firebaseCnUsers.login(email, password);
    // console.log(this._firebaseCnUsers.login(user, password));
  }
}
