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
                resolve(router.parseUrl('/login'));
            }
        });
    });
};
