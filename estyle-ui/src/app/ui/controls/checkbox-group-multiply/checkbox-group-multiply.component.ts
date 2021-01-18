import {
  AfterViewInit,
  Component,
  ContentChildren, EventEmitter,
  forwardRef,
  Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';
import { isUndefined, isEqual } from 'lodash';
import {Subject} from "rxjs";
import {CheckboxComponent} from "@app/ui/controls/checkbox/checkbox.component";

@Component({
  selector: 'app-checkbox-group-multiply',
  templateUrl: './checkbox-group-multiply.component.html',
  styleUrls: ['./checkbox-group-multiply.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupMultiplyComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxGroupMultiplyComponent),
      multi: true
    }
  ]
})
export class CheckboxGroupMultiplyComponent implements ControlValueAccessor, AfterViewInit, OnDestroy  {
  @ContentChildren(CheckboxComponent) components: QueryList<CheckboxComponent>;

  @Output() triggerBlur: EventEmitter<any> = new EventEmitter();
  @Output() triggerFocus: EventEmitter<any> = new EventEmitter();
  @Output() valueChange: EventEmitter<any> = new EventEmitter();

  @Input() typeItem = 'checkbox';
  @Input() checked: boolean;
  @Input() placeholder: string;
  @Input() submitted: boolean;
  @Input() label: string;
  @Input() value: any[] = [];
  @Input() disabled: boolean;

  protected readonly unsubscribe$ = new Subject<void>();

  formControl: FormControl;
  isFocused: boolean;

  get isError() {
    return (
      this.formControl &&
      this.formControl.invalid &&
      (this.formControl.dirty || this.formControl.touched || this.submitted)
    );
  }

  constructor() {
  }

  ngAfterViewInit(): void {
    this.components.forEach(component => {
      component.valueChange.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
        const found = (this.value || []).find(value => isEqual(value, event));

        if (isUndefined(found)) {
          this.value = [...this.value, event];
        } else {
          this.value = this.value.filter(value => !isEqual(value, event));
        }

        this.writeValue(this.value);
        this.valueChange.emit(this.value);
      });
    });

    setTimeout(() => this.writeValue(this.value || []), 50);
  }

  public writeValue(value: any) {
    this.value = value || [];
    this.propagateChange(value);

    if (!this.components) {
      return;
    }

    this.components.forEach(component => {
      const found = (this.value || []).find(v => isEqual(v, component.value));

      if (!isUndefined(found)) {
        component.check();
      } else {
        component.unCheck();
      }
    });
  }

  public onChange(event) {
    this.value = event.target.value;
    this.valueChange.emit(this.value);
    this.propagateChange(this.value);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  public registerOnTouched() {
  }

  public propagateChange(_: any) {
  }

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
}
