import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input-field',
  templateUrl: './input-field.component.html',
  styleUrls: ['./input-field.component.scss']
})
export class InputFieldComponent {
  @Input() name: string;
  @Input() id: string;
  @Input() type = 'text';
  @Input() formControl: FormControl;
  @Input() label: string;
  @Input() wrap: string;
}
