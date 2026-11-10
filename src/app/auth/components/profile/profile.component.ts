import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { HeaderService } from '../../../core/services/header.service';
import { FormService } from '../../services/form.service';
import { FirebaseCnUsers } from '../../services/firebase-cn-users';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialog } from '../change-password-dialog/change-password-dialog';

@Component({
  selector: 'app-profile',
  providers: [FormService],
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class Profile implements OnInit {
  public profileForm: FormGroup;
  public isPasswordHidden = signal(true);
  private _dialog = inject(MatDialog);

  constructor(
    private fb: FormBuilder,

    private _headerService: HeaderService,

    public formService: FormService,

    private _firebaseCnUsers: FirebaseCnUsers,

    private _router: Router,
  ) {
    this.profileForm = this.fb.group({
      email: [{ value: _firebaseCnUsers.selectedUser()?.email, disabled: true }],
      userName: [
        _firebaseCnUsers.selectedUser()?.displayName,
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
      ],
      profileImg: [_firebaseCnUsers.selectedUser()?.photoURL, [Validators.required]],
      password: [''],
      // TODO: ADD VALIDATORS
    });
  }

  ngOnInit(): void {
    this._headerService.title.set('Perfil');
  }

  onSubmit(): void {
    // const user: PalabrinkUser = this.profileForm.value;
    // this._firebaseCnUsers.login(user);
  }
  hidePassword() {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }

  openChangePsswd() {
    //TODO: Aprovechar propiedades MatDialog: MaxWidth,MaxHeight,MinWidth,MinHeight
    const dialogRef = this._dialog.open(ChangePasswordDialog, {
      //Call to value "Signal->SignalValue()"
      // data: this.book(),
      minHeight: '50vh',
      maxHeight: '100vh',
      minWidth: '50vw',
      maxWidth: '100vw',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // if (result !== undefined) {
      //   this.animal.set(result);
      // }
    });
  }
}
