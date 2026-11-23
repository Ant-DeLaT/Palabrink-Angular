import { Component, effect, inject, input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FirebaseCnBooks } from '../../services/firebase-cn-books';
import { Book } from '../../interfaces/book';
import { isPlatformBrowser } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-selected-book',
  imports: [],
  templateUrl: './selected-book.html',
  styleUrl: './selected-book.scss',
  providers: [FirebaseCnBooks],
})
export class SelectedBook {
  private _fireBaseCnBooks = inject(FirebaseCnBooks);
  private readonly _platformId = inject(PLATFORM_ID);

  public id = input.required<string>();
  public book = signal<Book | null>(null);

  constructor() {
    effect(() => {
      const currentId = this.id();
      if (!isPlatformBrowser(this._platformId) || !currentId) return;

      this._fireBaseCnBooks
        .getBookById(currentId)
        .then((book) => {
          this.book.set(book);
        })
        .catch((error) => {
          console.error('Error al obtener el libro por ID:', error);
          this.book.set(null);
        });
    });
  }
}
