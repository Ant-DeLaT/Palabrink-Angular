import { inject, Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { environment } from '../../../../environments/environment';
import {
  collection,
  query,
  where,
  getDocs,
  Firestore,
  getFirestore,
  getDoc,
  doc,
} from 'firebase/firestore/lite';
import { Book } from '../interfaces/book';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable(
  
)
export class FirebaseCnBooks {
  private _popUp = inject(MatSnackBar);

  private readonly NOTIFICATION_TIMER = 3000;
  private readonly _db: Firestore;

  constructor() {
    const app = initializeApp(environment.firebase);
    this._db = getFirestore(app);
  }

  public async getBooks(): Promise<Book[]> {
    try {
      const q = query(collection(this._db, 'libros'));
      const querySnapshot = await getDocs(q);

      this._popUp.open('Libros cargados', 'Cerrar', { duration: this.NOTIFICATION_TIMER });
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
      this._popUp.open(`Error: ${error}`, 'Cerrar', {
        panelClass: ['snackbar-error'],
      });
      return Promise.reject(error);
    }
    // return
  }

  public async getBookById(id: string): Promise<Book> {
    try {
      const d = doc(this._db, 'libros', id);
      const docSnap = await getDoc(d);

      if (docSnap.data()) {
        this._popUp.open('Libro seleccionado', 'Cerrar', { duration: this.NOTIFICATION_TIMER });
        return {
          id,
          title: docSnap.data()!['title'],
          cover_url: docSnap.data()!['cover_url'],
          isbn: docSnap.data()!['isbn'],
          author: docSnap.data()!['author'],
          genre: docSnap.data()!['genre'],
          rating: docSnap.data()!['rating'],
          description: docSnap.data()!['description'],
        };
      } else {
        this._popUp.open(`Error: No se encontró el libro`, 'Cerrar', {
          panelClass: ['snackbar-error'],
        });
        return Promise.reject('No se encontró el libro');
      }
    } catch (error) {
      this._popUp.open(`Error: ${error}`, 'Cerrar', { panelClass: ['snackbar-error'] });
      return Promise.reject(error);
    }
  }
}
