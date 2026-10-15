import { Injectable } from '@angular/core';
import { Register } from '../components/register/register.component';
import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class FormService {
  public verifySamePassword(): ValidatorFn {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get('password')?.value;
      const passwordVerify = group.get('password_verify')?.value;

      return password === passwordVerify ? null : { passwordsNotMatching: true };
    };
  }

  public invalid(formGroup: FormGroup, formControlName: string): ValidationErrors | null {
    const control = formGroup.get(formControlName);
    if (control?.invalid && control?.touched) return control!.errors;

    return null;
  }
}
