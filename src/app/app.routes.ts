import { Routes } from '@angular/router';
import { Login } from './auth/components/login/login.component';
import { Register } from './auth/components/register/register.component';
import { ResetPassword } from './auth/components/reset-password/reset-password';
import { Home } from './features/books/components/home/home';
import { authGuard } from './auth/guards/auth.guard';
import { MissingPage } from './core/components/missing-page/missing-page';
import { Profile } from './profile';

export const routes: Routes = [
  /* TO DO hacer que redirigir no fuerce la salida de usuarios conectados*/
  { path: '', component: Home, pathMatch: 'full', canActivate: [authGuard] },
  { path: 'profile', component: Profile, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'reset-password', component: ResetPassword },
  { path: '**', component: MissingPage },
];
// por rellenar, "perfil","libros","página principal"
