import { Routes } from '@angular/router';
import { Login } from './auth/components/login/login.component';
import { Register } from './auth/components/register/register.component';
import { ResetPassword } from './auth/components/reset-password/reset-password';

export const routes: Routes = [
  /* TO DO hacer que redirigir no fuerce la salida de usuarios conectados*/
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'reset-password', component: ResetPassword },
];
