import { Component, computed, input, OnChanges, inject } from '@angular/core';
import { GenericInterface } from '../../dtos/rss-parser-dtos';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DropdownField, TextBoxField, Field } from '../../dtos/dynamicFormFieldsDto';
import { DynamicFormsHelper } from '../../helpers/dynamic-forms-helper';
import { DynamicFormComponent } from '../dynamic-form-component/dynamic-form-component';
import { MatGridListModule } from '@angular/material/grid-list';

@Component({
  selector: 'app-playground-content',
  imports: [
    ReactiveFormsModule,
    DynamicFormComponent,
    MatGridListModule
  ],
  templateUrl: './playground-content.html',
  styleUrl: './playground-content.scss',
})
export class PlaygroundContent implements OnChanges {
  fields: Field<string>[] = [];
  _dynamicFormsHelper = inject(DynamicFormsHelper);
  playgroundInput = input<GenericInterface>({});
  playgroundObject: GenericInterface = {};
  keys: string[] = [];
  values: string[] = [];
  playgroundContentForm = new FormGroup({});

  ngOnChanges() {
    this.playgroundObject = this.playgroundInput();
    Object.keys(this.playgroundObject).forEach((eachKey, index) => {
      console.log(`key is ${eachKey} with index ${index}`);
      this.keys.push(eachKey);
      if (typeof this.playgroundObject[eachKey] === 'string') {
        const tempValueField = new TextBoxField({
          key: eachKey,
          label: eachKey,
          value: this.playgroundObject[eachKey],
        });
        this.fields.push(tempValueField);
        this.values.push(this.playgroundObject[eachKey]);
      }
    });
    this.playgroundContentForm = this._dynamicFormsHelper.toFormGroup(this.fields);
    console.log(`value changes`, this.playgroundInput());

  }

  async onSubmit() {
    console.log(this.playgroundContentForm.value);
  }
}
