import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ShowerrorsService {

  constructor() { }

  public validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      } else if (control instanceof FormArray) {
        const controlAsFormArray = control as FormArray;
        for (let newcn of controlAsFormArray.controls) {
          if (newcn instanceof FormControl) {
            control.markAsTouched({ onlySelf: true });
          }
          if (newcn instanceof FormGroup) {
            this.validateAllFormFields(newcn);
          }
        }
      }
    });
  }
}
