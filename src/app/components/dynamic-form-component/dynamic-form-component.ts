import { Component, input, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Field } from '../../dtos/dynamicFormFieldsDto';

@Component({
  selector: 'app-dynamic-form-component',
  templateUrl: './dynamic-form-component.html',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
})
export class DynamicFormComponent {
  readonly field = input.required<Field<string>>();
  readonly form = input.required<FormGroup>();

  isValid() {
    return this.form().controls[this.field().key].valid;
  }
}
