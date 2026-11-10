import { Component, input, OnInit } from '@angular/core';

@Component({
  selector: 'app-selected-book',
  imports: [],
  templateUrl: './selected-book.html',
  styleUrl: './selected-book.css',
})
export class SelectedBook implements OnInit {
  public id = input.required<string>();

  ngOnInit(): void {
    console.log(this.id());
    //TODO:Obtener un libro por ID
    // getBookById()
  }
}
