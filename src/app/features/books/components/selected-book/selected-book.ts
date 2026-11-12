import { Component, inject, input, OnInit } from '@angular/core';
import { FirebaseCnBooks } from '../../services/firebase-cn-books';

@Component({
  selector: 'app-selected-book',
  imports: [],
  templateUrl: './selected-book.html',
  styleUrl: './selected-book.css',
})
export class SelectedBook implements OnInit {
  private _fireBaseCnBooks=inject(FirebaseCnBooks);
  public id = input.required<string>();

  ngOnInit(): void {
    console.log(this.id());
    this._fireBaseCnBooks.getBookById(this.id());
    //TODO:Obtener un libro por ID
    // getBookById()
  }
}
