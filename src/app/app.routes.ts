import { Routes } from '@angular/router';
import { Login } from './auth/components/login/login.component';
import { Register } from './auth/components/register/register.component';
import { EmailPassword } from './auth/components/email-password/email-password';
import { Home } from './features/books/components/home/home';
import { authGuard } from './auth/guards/auth.guard';
import { MissingPage } from './core/components/missing-page/missing-page';
import { SelectedBook } from './features/books/components/selected-book/selected-book';
import { Profile } from './auth/components/profile/profile.component';
import { ChangePassword } from './auth/components/change-password/change-password';
import { changePsswdGuard } from './auth/guards/change-psswd.guard';

export const routes: Routes = [
  /* TODO hacer que redirigir no fuerce la salida de usuarios conectados*/
  { path: '', component: Home, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'reset-password', component: EmailPassword },
  { path: 'selected-book/:id', component: SelectedBook },
  { path: 'change-password', component: ChangePassword, canActivate: [changePsswdGuard] },
  // "get"-> libro-idlibro
  { path: '**', component: MissingPage },
];
// por rellenar, "perfil","libros","página principal"
