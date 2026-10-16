import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatFormField, MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { HeaderService } from '../../../core/services/header.service';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, addDoc } from 'firebase/firestore/lite';
import { PalabrinkUser, UserRole } from '../../interfaces/user.interface';
import { FormService } from '../../services/form.service';
import { FirebaseCnUsers } from '../../services/firebase-cn-users';

@Component({
  selector: 'app-register',
  providers: [FormService, FirebaseCnUsers],
  imports: [MatError, ReactiveFormsModule, CommonModule, MatFormField, MatInputModule, MatButton],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class Register implements OnInit {
  public registerForm: FormGroup;

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
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/),
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

    // const users = this._firebaseCnUsers.getUsers();
    // console.log('Usuarios obtenidos desde Firebase:', users);
  }

  onSubmit() {
    // const formValue = this.registerForm.value;
    const { user, password, email } = this.registerForm.value;
    const userObject: PalabrinkUser = {
      name: user,
      // Password e email son iguales a sus contrapartes en const; no hace falta indicarle el tipo
      password,
      email,
      role: UserRole.USER,
    };
    //TODO: Introducir password hasheado
    this._firebaseCnUsers.register(userObject);
  }

  // TODO:Pasar esto a un servicio de validación de formularios
  //Verifica que dos contraseñas sean iguales, devuelve true si cierto

  // verifySamePasswd(password: string, password_verify: string): boolean {
  //   if (password === password_verify) {
  //     return true;
  //   }
  //   return false;
  // }

  // TODO: Debe ser igual que el del login / pasar funcionalidad a un servicio
  // Devuelve número mayor a cero dependiendo de lo que contenga usuario
  //¿Posible uso switch?
  // invalid(user: string): number {
  //   if (user.includes('@')) {
  //     return 1;
  //   }
  //   if (user.length < 7) {
  //     return 2;
  //   }
  //   return 0;
  // }
}
