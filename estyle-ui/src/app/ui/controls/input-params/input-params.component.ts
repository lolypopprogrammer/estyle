import {AfterViewInit, Component, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import {BehaviorSubject} from "rxjs";
import { SizeTypes } from 'src/app/quiz/quiz.service';

const ITEMS = {
  weight: [
    {
      name: 'kg',
      id: 1
    },
    {
      name: 'lbs',
      id: 2
    }
  ],
  length: [
    {
      name: 'cm',
      id: 1
    },
    {
      name: 'in',
      id: 2
    }
  ]
};

@Component({
  selector: 'app-input-params',
  templateUrl: './input-params.component.html',
  styleUrls: ['./input-params.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputParamsComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => InputParamsComponent),
      multi: true
    }
  ]
})
export class InputParamsComponent implements ControlValueAccessor, OnInit {
  @Output() triggerBlur: EventEmitter<any> = new EventEmitter();
  @Output() triggerFocus: EventEmitter<any> = new EventEmitter();
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @Input() placeholder: string;
  @Input() submitted: boolean;
  @Input() label: string;
  @Input() value: number | string;
  @Input() disabled: boolean;
  @Input() validationLabel: string;
  @Input() validationLabelPrefix: string;
  @Input() type = 'text';
  @Input() hint: string;
  @Input() vMask: string;
  @Input() vMaskPrefix = '';
  @Input() inputMode: 'text';
  @Input() removeZeroOnFocus: boolean;
  @Input() sizeType: SizeTypes;
  @Input() set selectItems(items) {
    this.selectItemsSubject$.next(items);
  }

  selectItemsSubject$: BehaviorSubject<any[]>;
  selectItems$;

  textModel;
  selected = 1;
  cachedValue: string | number;
  // @Input() formControl: FormControl;
  isFocused: boolean;
  formControl: FormControl;

  ngOnInit() {
    this.selectItemsSubject$ = new BehaviorSubject(ITEMS[this.sizeType]);
    this.selectItems$ = this.selectItemsSubject$.asObservable();
  }

  get isError() {
    return (
      this.formControl &&
      this.formControl.invalid &&
      (this.formControl.dirty || this.formControl.touched || this.submitted)
    );
  }

  onDropdown(val) {
    this.formControl.setValue(this.getCalculatedValue(this.textModel, val.name));
  }

  onValueChange() {
    const val = this.selectItemsSubject$.value.find(cur => cur.id === this.selected);
    this.formControl.setValue(this.getCalculatedValue(this.textModel, val.name));
  }

  public writeValue(value: number | string) {
    this.textModel = value;
    this.propagateChange(value);
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
    this.valueChange.emit(this.value);
    this.propagateChange(this.value);
  }

  private getCalculatedValue(value, measure) {
    switch (measure) {
      case 'in':
        return value * 2.54;
      case 'lbs':
        return value * 0.453592;
      case 'cm':
      case 'kg':
      default:
        return value;
    }

  }
}
