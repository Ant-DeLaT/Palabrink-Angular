import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormService } from '../../services/form.service';

@Component({
  selector: 'app-change-password-dialog',
  providers: [FormService],
  imports: [],
  templateUrl: './change-password-dialog.html',
  styleUrl: './change-password-dialog.css',
})
export class ChangePasswordDialog {
  // private _dialog = inject(MatDialog);
}
