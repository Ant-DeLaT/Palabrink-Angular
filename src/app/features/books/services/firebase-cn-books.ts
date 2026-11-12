import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../../environments/environment';
import {
  collection,
  query,
  where,
  getDocs,
  Firestore,
  getFirestore,
} from 'firebase/firestore/lite';
import { Book } from '../interfaces/book';

@Injectable()
export class FirebaseCnBooks {
  private readonly _db: Firestore;

  constructor() {
    const app = initializeApp(environment.firebase);
    this._db = getFirestore(app);
  }

  public async getBooks(): Promise<Book[]> {
    //TODO: Añadir pop-ups (SnackBar)

    try {
      const q = query(
        collection(this._db, 'libros'),
        /*, where('capital', '==', true)*/
      );
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((book) => ({
        id: book.id,
        title: book.get('title'),
        cover_url: book.get('cover_url'),
        isbn: book.get('isbn'),
        author: book.get('author'),
        genre: book.get('genre'),
        rating: book.get('rating'),
        description: book.get('description'),
      }));
    } catch (error) {
      return Promise.reject(error);
    }
    // return
  }

  public async getBookById(id: string): Promise<any> {
    //TODO: Añadir pop-ups (SnackBar)
  try {
      const q = query(
        collection(this._db, 'libros'),
        where('id', '==', id)
      );
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((book) => ({
        id: book.id,
        title: book.get('title'),
        cover_url: book.get('cover_url'),
        isbn: book.get('isbn'),
        author: book.get('author'),
        genre: book.get('genre'),
        rating: book.get('rating'),
        description: book.get('description'),
      }));
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
