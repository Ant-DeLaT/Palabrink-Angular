import { Component, inject, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../interfaces/book';
import { BookDialog } from '../book-dialog/book-dialog';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard {
  private readonly _dialog = inject(MatDialog);

  //Default function creates signals
  public book = input.required<Book>();

  openCard() {
    //TODO: Aprovechar propiedades MatDialog: MaxWidth,MaxHeight,MinWidth,MinHeight
    const dialogRef = this._dialog.open(BookDialog, {
      //Call to value "Signal->SignalValue()"
      data: this.book(),
      minHeight:"100vh",
      maxHeight:"100vh",
      minWidth:"150vh",
      maxWidth:"150vh",
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
      // if (result !== undefined) {
      //   this.animal.set(result);
      // }
    });
  }
}
// https://material.angular.dev/components/dialog/examples
