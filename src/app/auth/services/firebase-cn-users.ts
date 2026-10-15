import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, Firestore, getDocs, getFirestore } from 'firebase/firestore/lite';
import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

@Injectable()
export class FirebaseCnUsers {
  /*
  Para encontrar este bloque de código con los datos exactos de tu proyecto en Firebase, sigue estos pasos:
  1.Acceder a la configuración del proyecto:Entra en la consola de Firebase (console.firebase.google.com) y selecciona tu proyecto. 
    En el menú lateral izquierdo, haz clic en el icono del engranaje (Configuración) junto a "Visión general del proyecto" y selecciona Configuración del proyecto.
  2.Localizar la sección 'Tus aplicaciones':Pestaña General.En la pestaña "General" (la que se abre por defecto), 
    haz scroll hacia abajo del todo hasta llegar a la sección llamada Tus aplicaciones (Your apps).
  3.Copiar el objeto de configuración:Dentro de los detalles de tu aplicación web, verás un apartado llamado "Configuración del SDK". 
    Si seleccionas el formato Configuración (Config) o miras dentro del código de npm, 
    verás exactamente el objeto firebaseConfig con tu API Key y IDs reales listo para copiar y pegar.
  4.Seleccionar o crear la app web:Si ya registraste una aplicación, selecciónala. 
  Si no lo has hecho, haz clic en el botón circular con el icono `` (Web) para registrar una. Ponle un nombre y guarda.
   */

  private _db: Firestore;
  private _auth: Auth;

  constructor() {
    const app = initializeApp(environment.firebase);
    this._db = getFirestore(app);
    this._auth = getAuth(app);
  }

  public async getUsers() {
    //collection=>tabla
    const usersCol = collection(this._db, 'users');

    const usersSnapshot = await getDocs(usersCol);
    const usersList = usersSnapshot.docs.map((doc) => doc.data());
    return usersList;
  }

  async postUser(formUser: User) {
    createUserWithEmailAndPassword(this._auth, formUser.email, formUser.password)
      .then((userCredential) => {
        const firebaseUser = userCredential.user;

        // firebaseUser.displayName = formUser.name; // Asignar el email como displayName
        console.log('Token:', formUser);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error al crear el usuario:', errorCode, errorMessage);
      });

    // try {
    //   const usersTable = collection(this._db, 'users');

    //   const docRef = await addDoc(usersTable, user);

    //   console.log('Usuario creado correctamente con el ID:', docRef.id);
    // } catch (error) {
    //   console.error('Error al insertar el usuario:', error);
    // }
  }

  public async login(email: string, password: string) {
    //TODO: Posible upgrade
    try {
      const credenciales = await signInWithEmailAndPassword(this._auth, email, password);
      console.log('Login exitoso:', credenciales.user);
      return credenciales.user;
    } catch (error) {
      console.error('Error de autenticación:', error);
      throw error; // Lanza el error para capturarlo en el componente y mostrarlo en el formulario
    }
  }
}
