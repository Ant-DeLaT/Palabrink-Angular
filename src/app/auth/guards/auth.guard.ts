import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FirebaseCnUsers } from '../services/firebase-cn-users';

export const authGuard: CanActivateFn = () => {
    inject(FirebaseCnUsers);

    const router = inject(Router);
    const auth = getAuth();

    return new Promise((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe(); // Se detiene la escucha tras la primera respuesta

            if (user) {
                resolve(true);
            } else {
                // Sugerencia cambio router.createUrlTree(['/login])
                resolve(router.parseUrl('/login'));
            }
        });
    });
};
/*
POSIBLES CAUSAS DEL LOOP DE LOGIN

1.

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
