import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { HeaderService } from '../../../core/services/header.service';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, addDoc } from 'firebase/firestore/lite';
import { PalabrinkUser, UserRole } from '../../interfaces/user.interface';
import { FormService } from '../../services/form.service';
import { FirebaseCnUsers } from '../../services/firebase-cn-users';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  providers: [FormService],
  imports: [
    MatError,
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class Register implements OnInit {
  //Propiedades de la clase
  public isPasswordHidden = signal(true);
  public isVerifyHidden = signal(true);
  public registerForm: FormGroup;
  public tooltipText =
    'La contraseña debe seguir los siguientes requisitos:\n\n- Una letra mayúscula\n- Una letra minúscula\n- Un símbolo';

  //Flujo de vida en order
  constructor(
    private _formb: FormBuilder,
    public formService: FormService,
    private _titleService: HeaderService,
    private _firebaseCnUsers: FirebaseCnUsers,
  ) {
    this.registerForm = this._formb.group(
      {
        //TODO: Añadir validator usuario ya existe
        user: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)]],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(_firebaseCnUsers.PASSWORD_PATTERN),
          ],
        ],
        password_verify: ['', [Validators.required]],
      },
      {
        validators: formService.verifySamePassword(),
      },
    );
  }

  ngOnInit(): void {
    this._titleService.title.set('Register');
  }

  //Funciones
  onSubmit() {
    if (this.registerForm.invalid) return;

    const { user, password, email } = this.registerForm.value;
    const userObject: PalabrinkUser = {
      name: user,
      // Password e email son iguales a sus contrapartes en const; no hace falta indicarle el tipo
      password,
      email,
      role: UserRole.USER,
    };

    this._firebaseCnUsers.register(userObject);
  }

  hidePassword() {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }
  hideVerify() {
    this.isVerifyHidden.set(!this.isVerifyHidden());
  }
}
