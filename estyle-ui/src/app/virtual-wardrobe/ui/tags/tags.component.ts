import {Component, Input, ViewChild} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'ui-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss'],
})
export class UITagsComponent {
  @Input() name: string;
  @Input() id: string;
  @Input() formControl: FormControl;
  @Input() label: string;
  @Input() wrap: string;
  @Input() options: object[];
  @Input() items: Array<string> = [];

  @ViewChild('tagsField') tagsField;

  active: Boolean = false;
  focused: Boolean = false;

  fieldFocused() {
    this.active = true;
    this.focused = true;
  }

  isActive() {
    return this.items.length !== 0 || this.tagsField.searchTerm !== null;
  }

  fieldBlurred() {
    this.focused = false;
    this.active = this.isActive();
  }

  onChange(items: Array<string>) {
    this.items = items;

    this.formControl.setValue(this.items);
  }

  ngOnInit() {
    this.active = this.isActive();
    if (this.items.length > 0) {
      this.formControl.setValue(this.items);
    }
  }
}
