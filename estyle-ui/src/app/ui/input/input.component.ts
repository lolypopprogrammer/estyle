import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class UIInputComponent {
  @Input() name: string;
  @Input() id: string;
  @Input() type = 'text';
  @Input() formControl: FormControl;
  @Input() label: string;
  @Input() wrap: string;
  @Input() class: string;
  @Input() value: string;
}
