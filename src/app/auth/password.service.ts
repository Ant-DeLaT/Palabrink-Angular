import { Injectable } from '@angular/core';
import { Register } from './register/register';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class PasswordService {
    public nameValidator(): ValidatorFn {

        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.errors?.['required'] ? null : control.value;
            console.log('value', value);
            if (!value) return null;

            const tieneArroba = value.includes('@');
            return tieneArroba ? { containsAtSymbol: true } : null;
        };
    }
}
