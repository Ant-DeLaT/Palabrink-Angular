import { CommonModule } from '@angular/common';
import { Component, computed, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatError, MatInputModule } from '@angular/material/input';
import { HeaderService } from '../../../core/services/header.service';
import { FormService } from '../../services/form.service';
import { FirebaseCnUsers } from '../../services/firebase-cn-users';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-profile',
  providers: [FormService],
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    ReactiveFormsModule,
    CommonModule,
    MatFormField,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatError,
  ],
  templateUrl: './change-password.html',
  styleUrl: './change-password.css',
})
export class ChangePassword implements OnInit, OnDestroy {
  private _popUp = inject(MatSnackBar);

  public oobCode = input<string>();
  public isRecoveryMode = computed(() => Boolean(this.oobCode()));

  public changePasswordForm: FormGroup;
  //TODO: Pasarlo a FormService
  public isPasswordHidden = signal(true);
  public isVerifyHidden = signal(true);

  public tooltipText =
    'La contraseña debe seguir los siguientes requisitos:\n\n- Una letra mayúscula\n- Una letra minúscula\n- Un símbolo';

  constructor(
    private fb: FormBuilder,

    private _headerService: HeaderService,

    public formService: FormService,

    private _firebaseCnUsers: FirebaseCnUsers,

    private _router: Router,
  ) {
    this.changePasswordForm = this.fb.group(
      {
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
    this._headerService.title.set('Reiniciar Contraseña');
  }

  ngOnDestroy(): void {
    this._firebaseCnUsers.canChangePassword.set(false);
  }

  async onSubmit(): Promise<void> {
    if (this.changePasswordForm.invalid) return;

    try {
      const { password } = this.changePasswordForm.value;

      // Pasa this.oobCode(): si es undefined usará updatePassword; si existe, confirmPasswordReset
      console.log('oobCode:', this.oobCode());

      await this._firebaseCnUsers.changeUserPassword(password, this.oobCode());

      this._popUp.open('Contraseña actualizada correctamente', 'Cerrar', {
        duration: 3000,
      });

      this._router.navigate([this.isRecoveryMode() ? '/login' : '/profile']);
    } catch (error) { }
  }

  //TODO: Pasarlo a FormService
  hidePassword() {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }
  hideVerify() {
    this.isVerifyHidden.set(!this.isVerifyHidden());
  }
}
