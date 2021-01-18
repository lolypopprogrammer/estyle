import {
  AfterViewInit,
  Component,
  ContentChildren, EventEmitter,
  forwardRef, Input,
  OnDestroy,
  Output,
  QueryList
} from '@angular/core';
import {Subject} from 'rxjs';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {takeUntil} from 'rxjs/operators';
import {ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'app-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true
    }
  ]
})
export class CheckboxGroupComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
  @ContentChildren(CheckboxComponent) components: QueryList<CheckboxComponent>;

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

  ngAfterViewInit() {
    this.components.forEach(component => {
      if (component.value === this.value) {
        component.check();
      } else {
        component.unCheck();
      }

      component.valueChange.pipe(takeUntil(this.unsubscribe$)).subscribe(event => {
        this.writeValue(event);
        this.valueChange.emit(event);

        if (event === this.value) {
          component.check();
        } else {
          component.unCheck();
        }
      });
    });

    setTimeout(() => this.writeValue(this.value), 50);
  }

  public writeValue(value: any) {
    this.value = value;
    this.propagateChange(value);

    if (!this.components) {
      return;
    }

    this.components.forEach(component => {
      if (component.value === this.value) {
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
