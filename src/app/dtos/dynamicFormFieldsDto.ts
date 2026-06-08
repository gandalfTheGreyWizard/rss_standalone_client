export class Field<T> {
  value: T | undefined;
  key: string;
  type: string;
  order: number;
  options: { key: string; value: string} [];
  label: string;
  required: boolean;
  controlType: string;
  constructor(
    options: {
      value?: T;
      key?: string;
      label?: string;
      required?: boolean;
      order?: number;
      controlType?: string;
      type?: string;
      options?: {key: string; value: string}[];
  } = {},
  ) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.options = options.options || [];
  }
}

export class DropdownField extends Field<string> {
  override controlType = 'dropdown';
}

export class TextBoxField extends Field<string> {
  override controlType = 'textbox';
}
