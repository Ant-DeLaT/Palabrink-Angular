import { Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, Firestore, getDocs, getFirestore } from 'firebase/firestore/lite';
// import { User } from '../interfaces/user.interface';
import { environment } from '../../../environments/environment';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  updateProfile,
} from 'firebase/auth';
import { PalabrinkUser } from '../interfaces/user.interface';

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

  // private _db: Firestore;
  private _auth: Auth;

  public selectedUser = signal<User | null>(null);

  constructor() {
    const app = initializeApp(environment.firebase);
    this._auth = getAuth(app);

    onAuthStateChanged(this._auth, (user) => {
      this.selectedUser.set(user);
    });
  }

  async register({ email, password, name }: PalabrinkUser) {
    const credential = await createUserWithEmailAndPassword(this._auth, email, password);
    console.log({ credential });

    await updateProfile(credential.user, {
      displayName: name,
      photoURL:
        'https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/en-exclusiva/programados/mi-gato-tiene-genes-de-leopardo/5668482-1-esl-MX/Mi-gato-tiene-genes-de-leopardo.jpg',
    });

    return credential.user;
  }

  public async login({ email, password }: PalabrinkUser) {
    const credencial = await signInWithEmailAndPassword(this._auth, email, password);
    return credencial.user;
  }
}
