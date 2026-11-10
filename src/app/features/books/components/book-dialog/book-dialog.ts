import { Component, inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from '@angular/material/dialog';
import { Book } from '../../interfaces/book';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-dialog',
  imports: [MatButtonModule, MatDialogContent, MatDialogActions, MatDialogClose],
  templateUrl: './book-dialog.html',
  styleUrl: './book-dialog.scss',
})
export class BookDialog implements OnInit {
  readonly dialogRef = inject(MatDialogRef<BookDialog>);
  readonly book = inject<Book>(MAT_DIALOG_DATA);
  private _router = inject(Router);

  ngOnInit(): void {
    console.log('Hola', this.book);
  }

  more() {
    console.log('Hola MORE', this.book);
    this._router.navigate(['/selected-book', this.book.id]);
    this.dialogRef.close();
  }
}
