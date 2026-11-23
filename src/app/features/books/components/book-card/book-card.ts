import { Component, inject, input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Book } from '../../interfaces/book';
import { BookDialog } from '../book-dialog/book-dialog';

@Component({
  selector: 'app-book-card',
  imports: [],
  templateUrl: './book-card.html',
  styleUrl: './book-card.css',
})
export class BookCard implements OnInit {
  private readonly _dialog = inject(MatDialog);

  //Default function creates signals
  public book = input.required<Book>();

  ngOnInit(): void {
    console.log(this.book());
  }

  openCard() {
    //TODO: Aprovechar propiedades MatDialog: MaxWidth,MaxHeight,MinWidth,MinHeight
    const dialogRef = this._dialog.open(BookDialog, {
      //Call to value "Signal->SignalValue()"
      data: this.book(),
      // SI LA PROPORCIÓN SUPERA EL 65/50, GENERA "PANZA"
      // Dejado en automático, parece que funciona
      // minHeight: '65vh',
      // maxHeight:'200vh'
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
