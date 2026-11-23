import { inject, Injectable, signal } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { addDoc, collection, Firestore, getDocs } from 'firebase/firestore/lite';
import { environment } from '../../../environments/environment';
import {
  getAuth,
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
  updateProfile,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
  confirmPasswordReset,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { PalabrinkUser } from '../interfaces/user.interface';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class FirebaseCnUsers {
  private _popUp = inject(MatSnackBar);
  private _router = inject(Router);

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

  private readonly NOTIFICATION_TIMER = 3000;
  public readonly USERNAME_PATTERN = /^[a-zA-Z0-9]+$/;
  public readonly PASSWORD_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).+$/;

  private _auth: Auth;

  public selectedUser = signal<User | null>(null);
  public canChangePassword = signal(false);

  constructor() {
    const app = initializeApp(environment.firebase);
    this._auth = getAuth(app);

    onAuthStateChanged(this._auth, (user) => this.selectedUser.set(user));
  }

  async register({ email, password, name }: PalabrinkUser) {
    try {
      //TODO: Validar si nombre usuario existe
      const credential = await createUserWithEmailAndPassword(this._auth, email!, password!);

      await updateProfile(credential.user, {
        displayName: name,
        photoURL:
          'https://cdn.agenciasinc.es/var/ezwebin_site/storage/images/_aliases/img_1col/en-exclusiva/programados/mi-gato-tiene-genes-de-leopardo/5668482-1-esl-MX/Mi-gato-tiene-genes-de-leopardo.jpg',
      });
      this._router.navigate(['/']);
      this._popUp.open('Usuario registrado correctamente', 'Cerrar');
      return credential.user;
    } catch (error) {
      this._popUp.open(
        'Ha habido un problema, inténtelo de nuevo o contacte con el administrador',
        'Cerrar',
      );
      console.error({ error });
      return error;
    }
  }

  async updateProfile({ name, profileImgUrl }: PalabrinkUser) {
    try {
      await updateProfile(this.selectedUser()!, {
        displayName: name,
        photoURL: profileImgUrl,
      });
      this._popUp.open('Cambios realizados correctamente', 'Cerrar');
    } catch (error) {
      this._popUp.open(
        'Ha habido un problema, inténtelo de nuevo o contacte con el administrador',
        'Cerrar',
      );
      console.error({ error });
    }
  }

  public async login({ email, password }: PalabrinkUser): Promise<User | any> {
    try {
      const credential = await signInWithEmailAndPassword(this._auth, email!, password!);
      this._router.navigate(['/']);
      this._popUp.open(`¡Bienvenido ${credential.user.displayName}!`, 'Cerrar', {
        duration: this.NOTIFICATION_TIMER,
      });
      return credential.user;
    } catch (error) {
      this._popUp.open(
        'Ha habido un problema, inténtelo de nuevo o contacte con el administrador',
        'Cerrar',
      );
      console.error({ error });
      return error;
    }
  }

  public async logout(): Promise<void> {
    signOut(this._auth)
      .then(() => {
        this._router.navigateByUrl('/login');
        this._popUp.open('Se ha desconectado correctamente', 'Cerrar', {
          duration: this.NOTIFICATION_TIMER,
        });
      })
      .catch((error) => {
        this._popUp.open('Ha ocurrido un error', 'Cerrar');
        console.log(error);
        this._router.navigate(['/login']);
      });
  }

  public async reauthenticate(currentPassword: string): Promise<void> {
    const user = this.selectedUser();
    if (!user || !user.email) {
      throw new Error('No hay ningún usuario autenticado.');
    }

    const credential = EmailAuthProvider.credential(user.email, currentPassword);
    // Lanza excepción si la contraseña actual es incorrecta
    await reauthenticateWithCredential(user, credential);
    this.canChangePassword.set(true);
  }

  async changeUserPassword(newPassword: string, oobCode?: string): Promise<void> {
    // oob-> Out Of Bounds
    if (oobCode) {
      await confirmPasswordReset(this._auth, oobCode, newPassword);
      return;
    }

    const user = this.selectedUser();
    if (!user) {
      throw new Error('No hay ningún usuario autenticado.');
    }

    await updatePassword(user, newPassword);
    this.canChangePassword.set(false);
  }

  async sendRecoveryEmail(email: string): Promise<void> {
    console.log(window.location.origin);

    await sendPasswordResetEmail(this._auth, email.trim(), {
      url: `${window.location.origin}/change-password`,
    });
  }
}
