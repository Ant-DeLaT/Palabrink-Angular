import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HeaderService } from '../../../core/services/header.service';
import { FormService } from '../../services/form.service';
import { FirebaseCnUsers } from '../../services/firebase-cn-users';
import { PalabrinkUser } from '../../interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  providers: [FormService],
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class Login implements OnInit {
  public loginForm: FormGroup;
  public isPasswordHidden = signal(true);

  constructor(
    private fb: FormBuilder,
    private _headerService: HeaderService,
    public formService: FormService,
    private _firebaseCnUsers: FirebaseCnUsers,
    private _router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    this._headerService.title.set('Login');

    if (this._firebaseCnUsers.selectedUser()) this._router.navigate(['/']);
  }

  onSubmit() {
    const user: PalabrinkUser = this.loginForm.value;
    this._firebaseCnUsers.login(user);
  }
  hidePassword() {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }
}
