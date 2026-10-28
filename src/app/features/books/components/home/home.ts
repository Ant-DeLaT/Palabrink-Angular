import { Component, OnInit } from '@angular/core';
import { BookCard } from '../book-card/book-card';
import { Book } from '../../interfaces/book';

@Component({
  selector: 'app-home',
  imports: [BookCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  public books: Book[] = [
    {
      id: '1',
      alt_img: 'book1.jpg',
      title: 'book1',
      author: 'abasde',
      description: 'This is book one',
    },
    {
      id: '2',
      alt_img: 'book2.jpg',
      title: 'book2',
      author: 'incomse',
      description: 'This is book two',
    },
    {
      id: '3',
      alt_img: 'book3.jpg',
      title: 'book3',
      author: 'Anónimo',
      description: 'This is book three',
    },
    {
      id: '4',
      alt_img: 'book4.jpg',
      title: 'book4',
      author: 'Diego, el fenómeno',
      description: 'This is book four',
    },
  ];

  ngOnInit(): void {
    console.log('HOME');
  }
}
