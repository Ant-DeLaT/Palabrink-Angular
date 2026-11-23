import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatError, MatFormField, MatInput, MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { getAuth } from 'firebase/auth';
import { FirebaseCnUsers } from '../../services/firebase-cn-users';
import { FormService } from '../../services/form.service';
import { HeaderService } from '../../../core/services/header.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reset-password',
  providers: [FormService],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './email-password.html',
  styleUrl: './email-password.css',
})
export class EmailPassword implements OnInit {
  public emailPasswordForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _firebaseCnUsers: FirebaseCnUsers,
    private _headerService: HeaderService,
    public formService: FormService,
    private _popUp: MatSnackBar,
    // private _router: Router,
  ) {
    this.emailPasswordForm = this._fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this._headerService.title.set('Recuperar contraseña');
  }

  onSubmit() {
    if (this.emailPasswordForm.invalid) return;

    const { email } = this.emailPasswordForm.value;

    this._popUp.open('Enlace enviado, si el correo existe lo recibirá en breve', 'Cerrar');
    this._firebaseCnUsers.sendRecoveryEmail(email);
    //TODO:Limpiar el formulario
    this.emailPasswordForm.reset();
  }
}
