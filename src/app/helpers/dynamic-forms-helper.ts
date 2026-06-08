import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Field } from '../dtos/dynamicFormFieldsDto';

@Injectable({
  providedIn: 'root',
})
export class DynamicFormsHelper {
  toFormGroup(fields: Field<string>[]) {
    const group: any = {};

    fields.forEach((eachField) => {
      group[eachField.key] = new FormControl(eachField.value || '');
    });

    return new FormGroup(group);
  }
}
