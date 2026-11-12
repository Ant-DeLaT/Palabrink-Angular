import { Component, inject, OnInit, signal } from '@angular/core';
import { BookCard } from '../book-card/book-card';
import { Book } from '../../interfaces/book';
import { FirebaseCnBooks } from '../../services/firebase-cn-books';
import { HeaderService } from '../../../../core/services/header.service';

@Component({
  selector: 'app-home',
  providers: [FirebaseCnBooks],
  imports: [BookCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  private readonly _firebaseCnBooks = inject(FirebaseCnBooks);
  private readonly _headerService = inject(HeaderService);

  public books = signal<Book[]>([]);

  ngOnInit(): void {
    this._headerService.title.set('Palabrink | Home');

    // TODO:Añadir pop-ups (snackbar)
    this._firebaseCnBooks
      .getBooks()
      .then((books: Book[]) => {
        this.books.set(books);
      })
      .catch((error: Error) => {});
  }
}
