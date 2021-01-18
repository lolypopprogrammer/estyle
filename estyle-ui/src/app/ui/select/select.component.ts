import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ui-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class UISelectComponent {
  @Input() name: string;
  @Input() id: string;
  @Input() formControl: FormControl;
  @Input() label: string;
  @Input() wrap: string;
  @Input() options: object[];
  @Input() value: string = '';

  active: Boolean;

  constructor() {}

  onChange() {
    this.active = this.formControl.value.length > 0;
  }

  ngOnInit() {
   this.active = this.value.length > 0;
  }
}
