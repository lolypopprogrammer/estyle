import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true
    }
  ]
})
export class CheckboxComponent implements ControlValueAccessor {
  @Output() triggerBlur: EventEmitter<any> = new EventEmitter();
  @Output() triggerFocus: EventEmitter<any> = new EventEmitter();
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @Input() typeItem = 'checkbox';
  @Input() checked: boolean;
  @Input() placeholder: string;
  @Input() submitted: boolean;
  @Input() label: string;
  @Input() value: number | string | boolean | any[];
  @Input() disabled: boolean;

  isFocused: boolean;
  formControl: FormControl;

  constructor() {
  }

  public writeValue(value: number | string | boolean | any[]) {
    this.checked = !!value;
    this.propagateChange(value);
  }

  onClick(event) {
    if (this.checked && this.typeItem === 'radio') {
      event.preventDefault();
    }
  }

  public check() {
    this.checked = true;
  }

  public unCheck() {
    this.checked = false;
  }

  get isError() {
    return (
      this.formControl &&
      this.formControl.invalid &&
      (this.formControl.dirty || this.formControl.touched || this.submitted)
    );
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {}

  public propagateChange(_: any) {}

  public validate(formControl: FormControl) {
    this.formControl = formControl;
  }

  public onFocus(event) {
    this.isFocused = true;
    this.triggerFocus.emit(event);
  }

  public onBlur(event) {
    this.isFocused = false;
    this.triggerBlur.emit(event);
  }

  public onChange(event) {
    const checked = event.target.checked;

    if (this.typeItem === 'boolean') {
      this.writeValue(checked);
      this.valueChange.emit(checked);
      return;
    }

    if (this.typeItem === 'multiply') {
      this.writeValue(this.value);
      this.valueChange.emit(this.value);
      return;
    }

    if (this.typeItem === 'radio') {
      this.writeValue(this.value);
      this.valueChange.emit(this.value);
      return;
    }

    let value = checked ? this.value : null;

    this.writeValue(value);
    this.valueChange.emit(value);
  }

}
