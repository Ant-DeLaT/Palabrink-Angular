import { Component, inject, signal } from '@angular/core';
import { MatDialog, MatDialogActions, MatDialogRef } from '@angular/material/dialog';
import { FormService } from '../../services/form.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FirebaseCnUsers } from '../../services/firebase-cn-users';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-password-dialog',
  providers: [FormService],
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule, MatDialogActions],
  templateUrl: './confirm-password-dialog.html',
  styleUrl: './confirm-password-dialog.css',
})
export class ConfirmPasswordDialog {
  private _dialog = inject(MatDialog);
  private _firebaseCnUsers = inject(FirebaseCnUsers);
  private _fb = inject(FormBuilder);
  private _popUp = inject(MatSnackBar);
  public formService = inject(FormService);
  private _router = inject(Router);
  readonly dialogRef = inject(MatDialogRef<ConfirmPasswordDialog>);

  public confirmPasswordDialogForm: FormGroup;

  public isPasswordHidden = signal(true);

  constructor() {
    this.confirmPasswordDialogForm = this._fb.group({
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.confirmPasswordDialogForm.invalid) return;

    const { password } = this.confirmPasswordDialogForm.value;

    try {
      await this._firebaseCnUsers.reauthenticate(password);
      this.dialogRef.close();
      this._router.navigate(['change-password']);
    } catch (error: any) {
      let message = 'Error al verificar la contraseña';

      if (error?.code === 'auth/invalid-login-credentials') {
        message = 'La contraseña actual es incorrecta';
      }
      this.confirmPasswordDialogForm.get('password')?.setErrors({ authError: message });
    }
  }
  hidePassword() {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }

  verifyPassworddAndRedirect(password: string) {
    // if(this._firebaseCnUsers.PASSWORD_PATTERN==password)? :
  }
  closeDialog() {
    this._dialog.closeAll();
  }
  // closeDialog(){
  //   this._dialog.close();
  // }
}
