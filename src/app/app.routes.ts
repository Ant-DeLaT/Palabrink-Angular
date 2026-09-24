import { Routes } from '@angular/router';
import { Login } from './auth/login/login';
import { Register } from './auth/register/register';

export const routes: Routes = [
    /* TO DO hacer que redirigir no fuerce la salida de usuarios conectados*/
    {path:'',redirectTo:'login',pathMatch:'full'},
    {path:'login',component:Login},
    {path:'register',component:Register}

];
