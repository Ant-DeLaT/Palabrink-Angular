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
import { ConfirmPasswordDialog } from '../confirm-password-dialog/confirm-password-dialog';
import { ImageUploader } from '../../../shared/components/image-uploader/image-uploader';
import { PalabrinkUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-profile',
  providers: [FormService],
  imports: [
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    MatIconModule,
    ImageUploader,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class Profile implements OnInit {
  public profileForm: FormGroup;
  public isPasswordHidden = signal(true);
  private _dialog = inject(MatDialog);

  constructor(
    private _fb: FormBuilder,

    private _headerService: HeaderService,

    public formService: FormService,

    private _firebaseCnUsers: FirebaseCnUsers,

    private _router: Router,
  ) {
    this.profileForm = this._fb.group(
      {
        email: [{ value: _firebaseCnUsers.selectedUser()?.email, disabled: true }],
        name: [
          _firebaseCnUsers.selectedUser()?.displayName,
          [Validators.required, Validators.pattern(/^[a-zA-Z0-9]+$/)],
        ],
        profileImgUrl: [_firebaseCnUsers.selectedUser()?.photoURL, Validators.required],
      },
      // TODO: ADD VALIDATORS
    );
  }

  ngOnInit(): void {
    this._headerService.title.set('Perfil');
  }

  onSubmit(): void {
    if (this.profileForm.invalid) return;

    const { name, profileImgUrl } = this.profileForm.value;
    const userObject: PalabrinkUser = {
      name,
      profileImgUrl,
    };

    this._firebaseCnUsers.updateProfile(userObject);
  }

  hidePassword() {
    this.isPasswordHidden.set(!this.isPasswordHidden());
  }

  openChangePsswd() {
    const dialogRef = this._dialog.open(ConfirmPasswordDialog, {
      minHeight: '20rem',
      minWidth: '25rem',
      maxHeight: '100rem',
      maxWidth: '125rem',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // if (result !== undefined) {
      //   this.animal.set(result);
      // }
    });
  }
  getImageUrl(url: string) {
    this.profileForm.patchValue({ profileImgUrl: url });
  }
}
