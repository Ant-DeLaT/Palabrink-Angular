import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseCnUsers } from '../services/firebase-cn-users';

export const changePsswdGuard: CanActivateFn = (route) => {
  const firebaseCnUsers = inject(FirebaseCnUsers);

  const router = inject(Router);
  // const auth = getAuth();

  // 1. Indicador en la URL: si trae oobCode, es recuperación de contraseña sin sesión
  const hasRecoveryCode = Boolean(route.queryParamMap.get('oobCode'));
  if (hasRecoveryCode) {
    return true;
  }

  //TODO: False???
  console.log('guard', firebaseCnUsers.canChangePassword());
  // 2. Si no hay código, exige que el usuario venga del diálogo de reautenticación
  return firebaseCnUsers.canChangePassword() || router.createUrlTree(['/']);
};
/*
POSIBLES CAUSAS DEL LOOP DE LOGIN

RECOMENDADO POR LA IA
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth, authState } from '@angular/fire/auth';
import { map, take } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return authState(auth).pipe(
    take(1), // Toma solo el primer estado y cierra la suscripción automáticamente; uso alternativo: first()
    map(user => {
      if (user) {
        return true;
      } else {
        // Redirige al login guardando la URL a la que intentaba acceder
        return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
      }
    })
  );
};
*/
